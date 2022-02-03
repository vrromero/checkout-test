import mercadopago from "mercadopago";
import { baseUrl } from "../../components/config";

export default async function apiNote(req, res) {
  switch (req.method) {
    case "POST":
      await postCall(req, res); // Post preference
      break;
    default:
      return res.status(405).json({ err: `${req.method} Not Allowed` });
  }
}

const postCall = async (req, res) => {
  const { name, price } = req.body;
  try {
    let preference = {
      items: [
        {
          id: "1234",
          title: name,
          currency_id: "PEN",
          picture_url: `${baseUrl}/1.jpg`,
          description: "Dispositivo móvil de Tienda e-commerce",
          quantity: 1,
          unit_price: Number(price),
        },
      ],
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_46542185@testuser.com",
        phone: {
          area_code: "11",
          number: 22223333,
        },
        identification: {
          type: "DNI",
          number: "12345678",
        },
        address: {
          street_name: "Falsa",
          street_number: 123,
          zip_code: "1111",
        },
      },
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending`,
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [{ id: "diners" }], //
        excluded_payment_types: [{ id: "atm" }],
        installments: 6,
      },
      notification_url: "https://webhook.site/09d7be80-8ebe-44fb-9719-c524b737f6ba", 
      external_reference: "urban_rain2506@hotmail.com",
    };

    mercadopago.configure({
      integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
      access_token:
        "APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439",
    });

    const mdRes = await mercadopago.preferences.create(preference);
    if (mdRes) return res.json(mdRes);

    res.status(402).json({ err: "No Response" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
