import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Monument3DViewerProps {
  monumentName: string;
  monumentImage: string;
}

export default function Monument3DViewer({ monumentName, monumentImage }: Monument3DViewerProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [zoom, setZoom] = useState(100);

  const resetView = () => {
    setRotateX(0);
    setRotateY(0);
    setZoom(100);
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{monumentName}</h3>
        <p className="text-muted-foreground">Интерактивный 3D просмотр памятника</p>
      </div>

      <div 
        className="relative w-full h-96 bg-gradient-to-br from-muted to-background rounded-lg overflow-hidden mb-6 flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${zoom / 100})`,
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="relative">
            <img
              src={monumentImage}
              alt={monumentName}
              className="w-64 h-80 object-cover rounded-lg shadow-2xl"
              style={{ 
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                transform: 'translateZ(20px)'
              }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"
              style={{ transform: 'translateZ(21px)' }}
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-muted-foreground">
          <Icon name="Info" size={14} className="inline mr-1" />
          Используйте ползунки для вращения
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Icon name="RotateCw" size={16} className="text-primary" />
              Вращение по горизонтали
            </label>
            <span className="text-sm text-muted-foreground">{rotateY}°</span>
          </div>
          <Slider
            value={[rotateY]}
            onValueChange={(value) => setRotateY(value[0])}
            min={-180}
            max={180}
            step={5}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Icon name="Rotate3d" size={16} className="text-primary" />
              Вращение по вертикали
            </label>
            <span className="text-sm text-muted-foreground">{rotateX}°</span>
          </div>
          <Slider
            value={[rotateX]}
            onValueChange={(value) => setRotateX(value[0])}
            min={-90}
            max={90}
            step={5}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Icon name="ZoomIn" size={16} className="text-primary" />
              Масштаб
            </label>
            <span className="text-sm text-muted-foreground">{zoom}%</span>
          </div>
          <Slider
            value={[zoom]}
            onValueChange={(value) => setZoom(value[0])}
            min={50}
            max={150}
            step={5}
            className="w-full"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={resetView} variant="outline" className="flex-1">
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Сбросить вид
          </Button>
          <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Icon name="Share2" size={16} className="mr-2" />
            Поделиться
          </Button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Совет</p>
            <p>Вы можете посмотреть памятник со всех сторон, чтобы лучше представить, как он будет выглядеть на месте захоронения.</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
