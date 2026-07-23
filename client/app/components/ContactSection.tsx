export default function ContactSection() {
  return (
    <section className="py-20 px-10 bg-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        Contact Us
      </h2>

      <div className="max-w-3xl mx-auto text-center space-y-4">
        <p>
          <strong>📍 Address:</strong><br />
          Hyderabad, Telangana
        </p>

        <p>
  <strong>📞 Phone:</strong><br />

  <a href="tel:+919177844081" className="text-blue-700 hover:underline">
    +91 98765 43210
  </a>

  <br />

  <a href="tel:+919246523689" className="text-blue-700 hover:underline">
    +91 9246523689
  </a>
</p>

        <p>
          <strong>📧 Email:</strong><br />
          nagasainewpolymers@gmail.com
        </p>
      </div>
    </section>
  );
}