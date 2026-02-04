import aboutImage from '@/assets/about-showroom.jpg';

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={aboutImage}
                alt="Шоурум напольных покрытий"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Accent decoration */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-primary/10" />
          </div>

          {/* Content */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              О компании
            </span>
            <h2 className="heading-lg mt-2 mb-6">
              15 лет создаём уют в вашем доме
            </h2>
            <p className="text-body mb-6">
              Компания «ПолМастер» — один из ведущих поставщиков напольных покрытий в регионе. 
              За годы работы мы завоевали доверие тысяч клиентов благодаря качественной продукции 
              и профессиональному сервису.
            </p>
            <p className="text-body mb-8">
              Мы сотрудничаем только с проверенными производителями из Европы и России, 
              что гарантирует высокое качество и долговечность каждого покрытия. 
              Наши специалисты помогут подобрать идеальное решение для любого интерьера и бюджета.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-secondary rounded-xl">
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-small">Видов покрытий в наличии</div>
              </div>
              <div className="p-4 bg-secondary rounded-xl">
                <div className="text-2xl font-bold text-primary mb-1">98%</div>
                <div className="text-small">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
