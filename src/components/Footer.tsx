import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4 bg-transparent">
              <picture>
                <source srcSet="/logo-80.webp" type="image/webp" width={40} height={40} />
                <img
                  src="/logo-80.png"
                  alt="ПолМастер — напольные покрытия"
                  className="h-10 w-10 object-contain rounded-lg bg-transparent"
                  width={40}
                  height={40}
                />
              </picture>
              <span className="text-xl font-bold">ПолМастер</span>
            </div>
            <p className="text-background/70 text-sm mb-6">
              Надёжный поставщик напольных покрытий с 2009 года. Качество, которому можно доверять.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.365 1.26 2.179 1.818.616.422 1.084.33 1.084.33l2.178-.03s1.14-.071.6-.974c-.045-.074-.318-.663-1.634-1.875-1.378-1.27-1.193-1.065.466-3.26.633-.839 1.07-1.746 1.07-1.746s.208-.51-.213-.584c-.423-.075-1.096-.03-1.096-.03h-2.31s-.202-.027-.35.063c-.146.087-.24.29-.24.29s-.432 1.152-.993 2.097c-1.21 1.92-1.695 2.023-1.895 1.904-.463-.28-.347-1.12-.347-1.72 0-1.87.283-2.65-.55-2.853-.277-.067-.48-.112-1.19-.119-.91-.008-1.681.003-2.115.217-.29.143-.513.46-.376.478.169.024.55.103.753.38.264.358.255 1.16.255 1.16s.152 2.202-.354 2.473c-.346.186-.823-.194-1.848-1.93-.524-.89-.916-1.877-.916-1.877s-.076-.187-.212-.288c-.164-.122-.394-.16-.394-.16H4.47s-.32.01-.437.148c-.105.125-.008.382-.008.382s2.024 4.742 4.321 7.125c2.107 2.186 4.5 2.04 4.5 2.04h1.083s.327-.036.494-.217z" />
                </svg>
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  г. Москва, ул. Примерная, д. 123, ТЦ «ПолМаркет»
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+74951234567" className="text-background/70 text-sm hover:text-primary transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@polmaster.ru" className="text-background/70 text-sm hover:text-primary transition-colors">
                  info@polmaster.ru
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  Пн-Сб: 9:00 - 20:00
                </span>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              {['Главная', 'О компании', 'Каталог', 'Услуги', 'Отзывы', 'Контакты'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-background/70 text-sm hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Информация</h3>
            <div className="text-background/70 text-sm space-y-2">
              <p>ООО «ПолМастер»</p>
              <p>ИНН: 7712345678</p>
              <p>ОГРН: 1234567890123</p>
              <p className="pt-4">
                <a href="#" className="hover:text-primary transition-colors">
                  Политика конфиденциальности
                </a>
              </p>
              <p>
                <a href="#" className="hover:text-primary transition-colors">
                  Пользовательское соглашение
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-10 pt-6 text-center">
          <p className="text-background/50 text-sm">
            © 2024 ПолМастер. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
