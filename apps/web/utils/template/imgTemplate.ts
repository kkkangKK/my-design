const textTemplate = [
  {
    style: {
      width: "100px",
      height: "200px",
      // backgroundImage: `url('/images/bg1.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg1.png?t=${Date.now()}')`, //加时间是为了强刷缓存
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "200px",
      // backgroundImage: `url('/images/bg2.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg2.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "150px",
      height: "100px",
      // backgroundImage: `url('/images/bg3.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg3.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/images/bg4.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg4.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/images/bg5.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg5.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "150px",
      height: "100px",
      // backgroundImage: `url('/images/bg6.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg6.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/images/bg7.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg7.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/images/bg8.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg8.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "150px",
      height: "100px",
      // backgroundImage: `url('/images/bg9.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg9.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "150px",
      height: "100px",
      // backgroundImage: `url('/images/bg11.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg11.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "200px",
      // backgroundImage: `url('/images/bg10.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg10.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "200px",
      // backgroundImage: `url('/images/bg12.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg12.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "200px",
      // backgroundImage: `url('/images/bg13.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg13.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "200px",
      // backgroundImage: `url('/images/bg14.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg14.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "200px",
      // backgroundImage: `url('/images/bg15.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg15.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "200px",
      // backgroundImage: `url('/images/bg16.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg16.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "200px",
      // backgroundImage: `url('/images/bg17.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg17.jpg?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "other",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/images/bg18.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/bg18.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/youth-1.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/youth-1.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/youth-2.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/youth-2.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/youth-3.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/youth-3.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/youth-4.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/youth-4.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/youth-5.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/youth-5.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/youth-6.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/youth-6.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/campus-1.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/campus-1.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/campus-2.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/campus-2.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/campus-3.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/campus-3.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/campus-4.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/campus-4.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/campus-5.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/campus-5.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/campus-6.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/campus-6.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/campus-7.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/campus-7.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/campus-8.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/campus-8.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/campus-9.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/campus-9.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/campus-10.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/campus-10.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/campus-11.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/campus-11.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "youth",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-1.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-1.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-2.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-2.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-3.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-3.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-4.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-4.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-5.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-5.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-6.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-6.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-7.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-7.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-8.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-8.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-9.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-9.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-10.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-10.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-11.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-11.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-12.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-12.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/wedding-13.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/wedding-13.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "wedding",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/sale-1.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/sale-1.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/sale-2.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/sale-2.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/sale-3.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/sale-3.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/sale-4.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/sale-4.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/sale-5.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/sale-5.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/sale-6.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/sale-6.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/sale-7.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/sale-7.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/sale-8.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/sale-8.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/recruitment-1.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/recruitment-1.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "recruitment",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/recruitment-2.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/recruitment-2.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "recruitment",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/recruitment-3.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/recruitment-3.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "recruitment",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/recruitment-4.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/recruitment-4.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "recruitment",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/recruitment-5.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/recruitment-5.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "recruitment",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/recruitment-6.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/recruitment-6.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "recruitment",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/recruitment-7.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/recruitment-7.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "recruitment",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/recruitment-8.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/recruitment-8.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "recruitment",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-1.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-1.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-2.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-2.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-3.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-3.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-4.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-4.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-5.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-5.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-6.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-6.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-7.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-7.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-8.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-8.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-9.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-9.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-10.png')`
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-10.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-11.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-11.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-12.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-12.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-13.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-13.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-14.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-14.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-15.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-15.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-16.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-16.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
  {
    style: {
      width: "100px",
      height: "100px",
      // backgroundImage: `url('/resource/other-17.png')`,
      backgroundImage: `url('https://poster-craft-kkkang.oss-cn-beijing.aliyuncs.com/editor/海报元素/other-17.png?t=${Date.now()}')`,
      backgroundSize: "100% 100%",
    },
    mode: "daily",
  },
];

export default textTemplate;
