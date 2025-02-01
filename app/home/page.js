"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background text-text">
      {/* 🌟 Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center bg-[url('/hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl font-bold text-white">
            Experience Wilpattu Like Never Before
          </h1>
          <p className="text-lg text-gray-200 mt-4">
            Enjoy a luxurious stay while exploring Sri Lanka’s largest national
            park.
          </p>
          <Link href="/rooms">
            <button className="mt-6 bg-accent text-black px-6 py-3 rounded-lg shadow-md hover:bg-yellow-400 transition">
              Explore Rooms
            </button>
          </Link>
        </div>
      </section>

      {/* 🏨 About Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-primary">About Us</h2>
        <p className="text-lg text-gray-600 mt-4">
          Nestled near the heart of Wilpattu National Park, our lodge offers the
          perfect escape for nature lovers and wildlife enthusiasts.
        </p>
      </section>

      {/* 🛏️ Featured Rooms */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-primary text-center">
          Our Rooms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {/* Room 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/room1.jpg"
              alt="Luxury Room"
              width={400}
              height={250}
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary">Deluxe Room</h3>
              <p className="text-gray-600">Starting at $120 per night</p>
              <Link href="/rooms">
                <button className="mt-4 bg-secondary text-white px-4 py-2 rounded hover:bg-red-700 transition">
                  View Room
                </button>
              </Link>
            </div>
          </div>

          {/* Room 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image src="/room2.jpg" alt="Cozy Suite" width={400} height={250} />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary">Safari Suite</h3>
              <p className="text-gray-600">Starting at $150 per night</p>
              <Link href="/rooms">
                <button className="mt-4 bg-secondary text-white px-4 py-2 rounded hover:bg-red-700 transition">
                  View Room
                </button>
              </Link>
            </div>
          </div>

          {/* Room 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/room3.jpg"
              alt="Family Cottage"
              width={400}
              height={250}
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary">
                Family Cottage
              </h3>
              <p className="text-gray-600">Starting at $180 per night</p>
              <Link href="/rooms">
                <button className="mt-4 bg-secondary text-white px-4 py-2 rounded hover:bg-red-700 transition">
                  View Room
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🌿 Services & Amenities */}
      <section className="bg-gray-100 py-20">
        <h2 className="text-4xl font-bold text-primary text-center">
          Our Amenities
        </h2>
        <div className="flex flex-wrap justify-center gap-12 mt-10">
          {/* 🛜 Free WiFi */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/wifi.png"
              alt="Free WiFi"
              width={60}
              height={60}
              className="mb-3"
            />
            <p className="text-lg text-gray-700">Free WiFi</p>
          </div>

          {/* 🍽️ Local Cuisine */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/food.png"
              alt="Local Cuisine"
              width={60}
              height={60}
              className="mb-3"
            />
            <p className="text-lg text-gray-700">Local Cuisine</p>
          </div>

          {/* 🚙 Safari Tours */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/safari.png"
              alt="Safari Tours"
              width={60}
              height={60}
              className="mb-3"
            />
            <p className="text-lg text-gray-700">Safari Tours</p>
          </div>
        </div>
      </section>

      {/* 🌟 Call to Action */}
      <section className="text-center py-20">
        <h2 className="text-4xl font-bold text-primary">
          Ready for Your Wilpattu Adventure?
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          Book your stay now and immerse yourself in nature!
        </p>
        <Link href="/booking">
          <button className="mt-6 bg-accent text-black px-6 py-3 rounded-lg shadow-md hover:bg-yellow-400 transition">
            Book Now
          </button>
        </Link>
      </section>
    </div>
  );
}
