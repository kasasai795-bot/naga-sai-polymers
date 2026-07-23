export default function WhyChooseUs() {
  return (
    <section className="bg-gray-100 py-20 px-10">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
          <p>
            Manufactured using high-quality raw materials to ensure durability.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-5xl mb-4">🚚</div>
          <h3 className="text-xl font-bold mb-2">Timely Delivery</h3>
          <p>
            Fast and reliable delivery across India.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-5xl mb-4">🎨</div>
          <h3 className="text-xl font-bold mb-2">Custom Printing</h3>
          <p>
            Customized bag printing based on customer requirements.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-5xl mb-4">🤝</div>
          <h3 className="text-xl font-bold mb-2">Trusted Service</h3>
          <p>
            Building long-term relationships through reliable service.
          </p>
        </div>

      </div>
    </section>
  );
}