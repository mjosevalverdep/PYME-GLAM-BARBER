import Header from '@/layouts/Header';
import HomeMain from '@/components/home/HomeMain';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 bg-gray-100">
      <Header />
      <div className="flex-grow">
        <HomeMain />
      </div>
    </div>
  );
}
