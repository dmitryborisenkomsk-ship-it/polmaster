import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import alexeyImg from '@/assets/reviews/alexey.jpg';
import mariaImg from '@/assets/reviews/maria.jpg';
import dmitryImg from '@/assets/reviews/dmitry.jpg';

const reviews = [
  {
    name: 'Алексей Петров',
    role: 'Владелец квартиры',
    content: 'Отличный магазин! Заказывал ламинат для всей квартиры. Менеджер помог подобрать идеальный вариант под мой бюджет. Доставили точно в срок, укладка прошла быстро и качественно.',
    rating: 5,
    image: alexeyImg,
  },
  {
    name: 'Мария Иванова',
    role: 'Дизайнер интерьера',
    content: 'Регулярно сотрудничаю с ПолМастер для своих проектов. Всегда большой выбор, актуальные коллекции и профессиональные консультации. Рекомендую всем своим клиентам!',
    rating: 5,
    image: mariaImg,
  },
  {
    name: 'Дмитрий Козлов',
    role: 'Частный дом',
    content: 'Выбирали паркетную доску для загородного дома. Понравился индивидуальный подход — приехали на замер, всё рассчитали, предложили несколько вариантов. Результатом довольны!',
    rating: 5,
    image: dmitryImg,
  },
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Отзывы клиентов</h2>
          <p className="text-body max-w-2xl mx-auto">
            Нам доверяют тысячи клиентов по всей России
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Review Card */}
            <div className="card-elevated text-center py-10 px-6 md:px-12">
              <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />
              
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20">
                <img
                  src={reviews[currentIndex].image}
                  alt={reviews[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                "{reviews[currentIndex].content}"
              </p>

              <div>
                <div className="font-semibold text-foreground">
                  {reviews[currentIndex].name}
                </div>
                <div className="text-small">{reviews[currentIndex].role}</div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
