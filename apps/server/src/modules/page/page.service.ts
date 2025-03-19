import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
// import { work } from '@poster-craft/schema';
import { work } from '@kkkang/schema';
// import { work } from '../../../../../packages/schema/src/schema/work';
import { eq } from 'drizzle-orm';

@Injectable()
export class PageService {
  constructor(@Inject(DB) private db: DbType) {}

  px2vw(components = []) {
    // '10px' '9.5px'
    const reg = /^(\d+(\.\d+)?)px$/;
    components.forEach((component: any = {}) => {
      const props = component.props || {};
      // 遍历组件的属性
      Object.keys(props).forEach((key) => {
        const val = props[key];
        if (typeof val !== 'string') {
          return;
        }
        // value 中没有 px，不是一个距离的属性
        if (reg.test(val) === false) {
          return;
        }
        const arr = val.match(reg) || [];
        const numStr = arr[1];
        const num = parseFloat(numStr);
        // 计算出 vw，重新赋值
        // 编辑器的画布宽度是 375
        const vwNum = (num / 375) * 100;
        props[key] = `${vwNum.toFixed(2)}vw`;
      });
    });
  }
  propsToStyle(props = {}) {
    const keys = Object.keys(props);
    const styleArr = keys.map((key) => {
      const formatKey = key.replace(
        /[A-Z]/g,
        (c) => `-${c.toLocaleLowerCase()}`,
      );
      // fontSize -> font-size
      const value = props[key];
      return `${formatKey}: ${value}`;
    });
    return styleArr.join(';');
  }

  async renderToPageData(id: string) {
    const currentWork = await this.db.query.work.findFirst({
      where: eq(work.uuid, id),
    });
    if (!currentWork) throw '工作区不存在';

    const { title, desc, content } = currentWork;
    this.px2vw(content && content.Elements);

    const html = content?.Elements.map((element) => {
      const style = this.propsToStyle(element.props);

      return `<div 
        id="${element.id}" 
        style="position: absolute; ${style}"
        >${element.text ? element.text : ''}</div>`;
    }).join('');

    const bodyStyle = this.propsToStyle(content && content.pageBackgroundStyle);
    const result = {
      html,
      bodyStyle,
      title,
      desc,
    };
    return result;
  }
}
