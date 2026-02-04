import { Truck, Shield, BadgePercent, Headphones } from 'lucide-react';

const advantages = [
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'Доставим заказ в течение 1-2 дней по городу и области',
  },
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: 'Официальная гарантия от производителя до 25 лет',
  },
  {
    icon: BadgePercent,
    title: 'Лучшие цены',
    description: 'Работаем напрямую с производителями без посредников',
  },
  {
    icon: Headphones,
    title: 'Поддержка 24/7',
    description: 'Консультация и помощь в выборе в любое время',
  },
];

const Advantages = () => {
  return (
    <section id="advantages" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Почему выбирают нас</h2>
          <p className="text-body max-w-2xl mx-auto">
            Мы заботимся о каждом клиенте и предлагаем лучший сервис на рынке
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => (
            <div
              key={index}
              className="card-elevated text-center group"
            >
              <div className="icon-box mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="heading-md mb-2">{item.title}</h3>
              <p className="text-small">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
