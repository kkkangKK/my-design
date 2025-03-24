import BaseLayout from "@/components/layouts/BaseLayout";
import Hero from "@/components/pages/index/Hero";
import Introduce from "@/components/pages/index/Introduce";
import TemplateList from "@/components/pages/index/TemplateList";
import WorksList from "@/components/pages/index/WorksList";
import AIChatWidget from "@/components/shared/AiChat";

function Main() {
  return (
    <BaseLayout>
      <AIChatWidget />
      <Hero />
      <Introduce />
      <TemplateList />
      <WorksList />
    </BaseLayout>
  );
}

export default Main;
