import Header from '@/layouts/admin/Header';
import HomeMain from '@/components/admin/HomeMain';

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/img/bg.jpg')" }}
    >
      <div className="flex flex-col items-center justify-between min-h-screen p-8 bg-opacity-80">
        <Header />
        <div className="flex-grow">
          <HomeMain />
        </div>
      </div>
    </div>
  );
}
