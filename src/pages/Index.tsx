import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Monument3DViewer from '@/components/Monument3DViewer';

interface Monument {
  id: number;
  title: string;
  material: string;
  price: string;
  image: string;
  description: string;
  size: string;
}

const monuments: Monument[] = [
  {
    id: 1,
    title: 'Гранит Габбро',
    material: 'Гранит',
    price: 'от 42 000 ₽',
    image: 'https://cdn.poehali.dev/projects/cef4fa2f-9dfb-4c7b-87af-06958110b565/files/5958a8ba-62af-4f96-83eb-3d134924a594.jpg',
    description: 'Классический памятник из гранита Габбро — надёжный и долговечный материал',
    size: '95×48×8 см'
  },
  {
    id: 2,
    title: 'Гранит карельский',
    material: 'Гранит',
    price: 'от 52 000 ₽',
    image: 'https://cdn.poehali.dev/projects/cef4fa2f-9dfb-4c7b-87af-06958110b565/files/5958a8ba-62af-4f96-83eb-3d134924a594.jpg',
    description: 'Элитный памятник из карельского гранита премиум-качества',
    size: '105×52×9 см'
  },
  {
    id: 3,
    title: 'Гранит Житомир',
    material: 'Гранит',
    price: 'от 48 000 ₽',
    image: 'https://cdn.poehali.dev/projects/cef4fa2f-9dfb-4c7b-87af-06958110b565/files/33a1f7bb-262c-4f73-a06f-8186f60d0dc7.jpg',
    description: 'Благородный красно-коричневый гранит из Житомира с уникальным природным узором',
    size: '100×50×8 см'
  },
  {
    id: 4,
    title: 'Мрамор с орнаментом',
    material: 'Мрамор',
    price: 'от 65 000 ₽',
    image: 'https://cdn.poehali.dev/projects/cef4fa2f-9dfb-4c7b-87af-06958110b565/files/c4f432e5-b8df-4dae-9711-844cb9f15151.jpg',
    description: 'Изысканный памятник из белого мрамора с резным растительным орнаментом',
    size: '120×60×10 см'
  },
  {
    id: 5,
    title: 'Габбро-диабаз',
    material: 'Габбро',
    price: 'от 38 000 ₽',
    image: 'https://cdn.poehali.dev/projects/cef4fa2f-9dfb-4c7b-87af-06958110b565/files/5958a8ba-62af-4f96-83eb-3d134924a594.jpg',
    description: 'Прочный памятник из карельского габбро-диабаза тёмно-серого оттенка',
    size: '90×45×8 см'
  },
  {
    id: 6,
    title: 'Комбинированный',
    material: 'Гранит + Мрамор',
    price: 'от 78 000 ₽',
    image: 'https://cdn.poehali.dev/projects/cef4fa2f-9dfb-4c7b-87af-06958110b565/files/c4f432e5-b8df-4dae-9711-844cb9f15151.jpg',
    description: 'Эксклюзивный памятник, сочетающий чёрный гранит и белый мрамор',
    size: '110×55×10 см'
  }
];

const services = [
  { icon: 'Hammer', title: 'Изготовление', description: 'Изготовление памятников любой сложности из гранита и мрамора' },
  { icon: 'Package', title: 'Доставка', description: 'Бережная доставка по всей России с гарантией сохранности' },
  { icon: 'Wrench', title: 'Установка', description: 'Профессиональная установка на месте захоронения' },
  { icon: 'Sparkles', title: 'Реставрация', description: 'Восстановление и обновление старых памятников' },
  { icon: 'Camera', title: 'Гравировка', description: 'Портреты, надписи и художественная гравировка' },
  { icon: 'Heart', title: 'Консультация', description: 'Помощь в выборе и оформлении документов' }
];

const reviews = [
  { name: 'Мария Петрова', rating: 5, text: 'Спасибо за внимательное отношение и качественную работу. Памятник получился именно таким, как мы хотели.', date: 'Ноябрь 2024' },
  { name: 'Сергей Иванов', rating: 5, text: 'Профессиональный подход на всех этапах. Доставка точно в срок, установка выполнена безупречно.', date: 'Октябрь 2024' },
  { name: 'Елена Смирнова', rating: 5, text: 'Благодарю за чуткость и понимание в трудный момент. Результат превзошёл ожидания.', date: 'Сентябрь 2024' }
];

export default function Index() {
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [activeFilter, setActiveFilter] = useState('Все');
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [viewerMonument, setViewerMonument] = useState<Monument>(monuments[0]);

  const filteredMonuments = activeFilter === 'Все' 
    ? monuments 
    : monuments.filter(m => m.material.includes(activeFilter));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Icon name="Box" size={32} className="text-primary" />
                <Icon name="Users" size={14} className="text-accent absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold text-primary">ВРЕМЯ ПАМЯТИ</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors">Услуги</a>
              <a href="#gallery" className="text-foreground hover:text-primary transition-colors">Галерея</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">О нас</a>
              <a href="#reviews" className="text-foreground hover:text-primary transition-colors">Отзывы</a>
              <a href="#delivery" className="text-foreground hover:text-primary transition-colors">Доставка</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Icon name="Phone" size={16} className="mr-2" />
              Позвонить
            </Button>
          </div>
        </nav>
      </header>

      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-secondary via-primary to-secondary text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Изготовление памятников</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">Достойная память о ваших близких</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Eye" size={20} className="mr-2" />
              Смотреть каталог
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 text-white border-white text-lg px-8"
              onClick={() => setShow3DViewer(true)}
            >
              <Icon name="Box" size={20} className="mr-2" />
              3D визуализация
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 container mx-auto px-4">
      </section>

      <section id="services" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Наши услуги</h2>
            <p className="text-muted-foreground text-lg">Полный комплекс услуг по изготовлению и установке</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={28} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Галерея работ</h2>
          <p className="text-muted-foreground text-lg">Примеры наших выполненных проектов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
            <img 
              src="https://cdn.poehali.dev/projects/cef4fa2f-9dfb-4c7b-87af-06958110b565/files/5ea38672-711e-4378-8ddc-4318ef97a544.jpg"
              alt="Галерея"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <p className="text-white font-semibold text-lg">Наша мастерская</p>
            </div>
          </div>
          {monuments.slice(0, 2).map((monument) => (
            <div key={monument.id} className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src={monument.image}
                alt={monument.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold text-lg">{monument.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">О нас</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Мы занимаемся изготовлением памятников более 15 лет. Наша команда опытных мастеров создаёт памятники, которые сохранят память о ваших близких на долгие годы.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Используем только качественные материалы: карельский гранит, итальянский мрамор, габбро-диабаз. Каждый памятник проходит тщательный контроль качества.
            </p>
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">лет опыта</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">2000+</div>
                <div className="text-muted-foreground">памятников</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">гарантия</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Отзывы клиентов</h2>
          <p className="text-muted-foreground text-lg">Что говорят о нас наши клиенты</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="fill-accent text-accent" />
                  ))}
                </div>
                <CardTitle className="text-lg">{review.name}</CardTitle>
                <CardDescription>{review.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="delivery" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-foreground">Доставка и установка</h2>
              <p className="text-muted-foreground text-lg">Работаем по всей России</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <Icon name="Truck" size={32} className="text-primary mb-3" />
                  <CardTitle>Доставка</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                  <p>• Бережная транспортировка</p>
                  <p>• Страхование груза</p>
                  <p>• Доставка точно в срок</p>
                  <p>• По Москве — бесплатно</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="CheckCircle" size={32} className="text-primary mb-3" />
                  <CardTitle>Установка</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                  <p>• Подготовка фундамента</p>
                  <p>• Профессиональный монтаж</p>
                  <p>• Благоустройство территории</p>
                  <p>• Гарантия 5 лет</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Контакты</h2>
          <p className="text-muted-foreground text-lg">Свяжитесь с нами удобным способом</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Телефон</div>
                    <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                    <div className="text-muted-foreground">Ежедневно с 9:00 до 21:00</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-muted-foreground">info@monument-master.ru</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Адрес</div>
                    <div className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</div>
                    <div className="text-muted-foreground">Пн-Вс: 9:00 - 21:00</div>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-8 bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Написать нам
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <Icon name="Box" size={28} className="text-accent" />
              <Icon name="Users" size={12} className="text-white absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold">ВРЕМЯ ПАМЯТИ</span>
          </div>
          <p className="text-white/70 mb-4">Достойная память о ваших близких</p>
          <p className="text-white/50 text-sm">© 2024 ВРЕМЯ ПАМЯТИ. Все права защищены.</p>
        </div>
      </footer>

      <Dialog open={!!selectedMonument} onOpenChange={() => setSelectedMonument(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedMonument?.title}</DialogTitle>
          </DialogHeader>
          {selectedMonument && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedMonument.image} 
                  alt={selectedMonument.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Описание</h4>
                  <p className="text-muted-foreground">{selectedMonument.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Характеристики</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Материал:</span>
                      <Badge>{selectedMonument.material}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Размер:</span>
                      <span className="font-medium">{selectedMonument.size}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Цена:</span>
                      <span className="text-2xl font-bold text-primary">{selectedMonument.price}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    setViewerMonument(selectedMonument);
                    setShow3DViewer(true);
                    setSelectedMonument(null);
                  }}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
                  size="lg"
                >
                  <Icon name="Box" size={20} className="mr-2" />
                  Посмотреть в 3D
                </Button>
                <Button className="w-full" variant="outline" size="lg">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Заказать консультацию
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={show3DViewer} onOpenChange={setShow3DViewer}>
        <DialogContent className="max-w-4xl">
          <Monument3DViewer 
            monumentName={viewerMonument.title}
            monumentImage={viewerMonument.image}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}