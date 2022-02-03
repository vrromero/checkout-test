/* eslint-disable @next/next/no-img-element */
import Head from "next/head"; 
import { baseUrl } from "../components/config";

export default function Home() {
  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: e.target.name,
          price: e.target.value,
          qty: 1,
        }),
      }).then((res) => res.json());

      if (response) {
        console.log(response.body?.id);

        const mp = new MercadoPago(
          "TEST-54c326c8-92c0-4ce2-bfbe-a8c18172c6b5",
          { locale: "es-PE" }
        );

        mp.checkout({
          preference: { id: response.body?.id },
          autoOpen: true,
        });
      }
    } catch (err) {
      console.info(err);
    }
  };

  return (
    <div className="global">
      <Head>
        <title>Tienda Online Test- Mercado Pago Checkout Pro</title>
        <meta name="description" content="Checkout Pro Certificate" />
      </Head>

      <header>
        <h1>Tienda E-commerce</h1>
      </header>

      <main>
        <div className="product">
          <img src="/1.jpg" alt="Product 1" />
          <p>Nombre: Celular 1</p>
          <p>Tipo: Smartphone</p>
          <p>Costo: $90</p>
          <button name="Celular 1" value={90} onClick={handleCheckout}>
            Pagar la compra
          </button>
        </div>
        <div className="product">
          <img src="/2.jpg" alt="Product 2" />
          <p>Nombre: Celular 2</p>
          <p>Tipo: Smartphone</p>
          <p>Costo: $10</p>
          <button name="Celular 2" value={10} onClick={handleCheckout}>
            Pagar la compra
          </button>
        </div>
      </main>

      <footer>
        Desarrollado por{" "}
        <a
          href="https://github.com/leivatorres/mpcertificado.git"
          target="_blank"
          rel="noreferrer noopener"
        >
          @leivatorres
        </a>
      </footer>
    </div>
  );
}
