interface CardProps {
    href: string;
    title: string;
    description: string;
  }
  
  export default function Card({ href, title, description }: CardProps) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
        <a href={href}>
          <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </a>
      </div>
    );
  }
  