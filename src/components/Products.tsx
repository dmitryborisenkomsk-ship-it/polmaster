import { ArrowRight } from 'lucide-react';
import laminateImg from '@/assets/products/laminate.jpg';
import parquetImg from '@/assets/products/parquet.jpg';
import vinylImg from '@/assets/products/vinyl.jpg';
import quartzVinylImg from '@/assets/products/quartz-vinyl.jpg';
import engineeredImg from '@/assets/products/engineered.jpg';
import corkImg from '@/assets/products/cork.jpg';

const products = [
  {
    title: 'Ламинат',
    description: 'Широкий выбор декоров и классов износостойкости',
    image: laminateImg,
    price: 'от 590 ₽/м²',
  },
  {
    title: 'Паркетная доска',
    description: 'Натуральная древесина для премиального интерьера',
    image: parquetImg,
    price: 'от 1 890 ₽/м²',
  },
  {
    title: 'Виниловый пол',
    description: 'Водостойкие покрытия для кухни и ванной',
    image: vinylImg,
    price: 'от 990 ₽/м²',
  },
  {
    title: 'Кварц-винил',
    description: 'Современное решение с повышенной прочностью',
    image: quartzVinylImg,
    price: 'от 1 290 ₽/м²',
  },
  {
    title: 'Инженерная доска',
    description: 'Стабильность и красота натурального дерева',
    image: engineeredImg,
    price: 'от 2 490 ₽/м²',
  },
  {
    title: 'Пробковое покрытие',
    description: 'Экологичное и тёплое покрытие для дома',
    image: corkImg,
    price: 'от 1 590 ₽/м²',
  },
];

const Products = () => {
  return (
    <section id="products" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Наши товары</h2>
          <p className="text-body max-w-2xl mx-auto">
            Подберём идеальное покрытие для любого помещения и бюджета
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                  {product.price}
                </div>
              </div>
              <div className="p-5">
                <h3 className="heading-md mb-2">{product.title}</h3>
                <p className="text-small mb-4">{product.description}</p>
                <button className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                  Подробнее <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
