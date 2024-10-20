import { createServer } from "miragejs";

export const mockServer = () => {
  return createServer({
    routes() {
      this.namespace = "api";

      this.get("/bills/TVProviders", () => {
        return {
          data: {
            response: [
              {
                service_type: "DSTV",
                name: "DSTV",
                src: "https://uploads-ssl.webflow.com/6282d4840afd19e1afa62e70/628ddbfe5f02a6243aa765dd_DSTV%202x.png",
                packages: [
                  { name: "DSTV Premium", price: 15000 },
                  { name: "DSTV Compact Plus", price: 10000 },
                  { name: "DSTV Compact", price: 7000 },
                  { name: "DSTV Family", price: 5000 },
                  { name: "DSTV Access", price: 3000 },
                ],
              },
              {
                service_type: "GoTV",
                name: "GoTV",
                src: "https://www.careernuggets.tv/wp-content/uploads/2018/02/gotv.png",
                packages: [
                  { name: "GoTV Max", price: 4100 },
                  { name: "GoTV Jolli", price: 2800 },
                  { name: "GoTV Jinja", price: 1900 },
                  { name: "GoTV Lite", price: 900 },
                ],
              },
              {
                service_type: "StarTimes",
                name: "StarTimes",
                src: "https://logodix.com/logo/1663657.png",
                packages: [
                  { name: "StarTimes Super", price: 4200 },
                  { name: "StarTimes Smart", price: 2600 },
                  { name: "StarTimes Nova", price: 1000 },
                ],
              },
              {
                service_type: "Showmax",
                name: "Showmax",
                src: "https://www.showmax.com/dam/learn-more/default-01/showmax-icon2_desktop_05012024.png?downsize=1200:*&output-format=webp&output-quality=70",
                packages: [
                  { name: "Showmax Standard", price: 2900 },
                  { name: "Showmax Mobile", price: 1200 },
                  { name: "Showmax Pro", price: 6300 },
                  { name: "Showmax Pro Mobile", price: 3200 },
                ],
              },
            ],
          },
        };
      });

      this.get("/bills/dataProviders", () => {
        return {
          data: {
            response: [
              {
                id: "MTN",
                desco: "MTN",
                src: "https://res.cloudinary.com/dfuso5kgt/image/upload/v1680034190/naira.com/New-mtn-logo_mpq64p.jpg",
                packages: [
                  { name: "MTN Daily Data Plan", price: 100, data: "100MB" },
                  { name: "MTN Weekly Data Plan", price: 500, data: "1.5GB" },
                  { name: "MTN Monthly Data Plan", price: 1500, data: "6GB" },
                ],
              },
              {
                id: "Airtel",
                desco: "Airtel",
                src: "https://res.cloudinary.com/dfuso5kgt/image/upload/v1679951486/naira.com/download__1_-removebg-preview_fem6sr.png",
                packages: [
                  { name: "Airtel Daily Data Plan", price: 100, data: "100MB" },
                  { name: "Airtel Weekly Data Plan", price: 500, data: "1GB" },
                  {
                    name: "Airtel Monthly Data Plan",
                    price: 1500,
                    data: "5GB",
                  },
                ],
              },
              {
                id: "Glo",
                desco: "Glo",
                src: "https://static-00.iconduck.com/assets.00/globacom-limited-icon-1024x1024-upx9lebq.png",
                packages: [
                  { name: "Glo Daily Data Plan", price: 50, data: "50MB" },
                  { name: "Glo Weekly Data Plan", price: 300, data: "1.2GB" },
                  { name: "Glo Monthly Data Plan", price: 1000, data: "3.2GB" },
                ],
              },
              {
                id: "9-Mobile",
                desco: "9-Mobile",
                src: "https://lordtech.com/wp-content/uploads/2021/07/9mobile-1-1-300x300.png",
                packages: [
                  {
                    name: "9-Mobile Daily Data Plan",
                    price: 200,
                    data: "200MB",
                  },
                  {
                    name: "9-Mobile Weekly Data Plan",
                    price: 500,
                    data: "1.5GB",
                  },
                  {
                    name: "9-Mobile Monthly Data Plan",
                    price: 1200,
                    data: "5GB",
                  },
                ],
              },
            ],
          },
        };
      });

      this.get("/bills/electricityProviders", () => {
        return {
          data: {
            response: [
              {
                id: "EKEDC",
                desco: "EKEDC",
                src: "https://cdn.punchng.com/wp-content/uploads/2018/07/21161927/EKEDC.jpg",
                packages: [
                  { name: "EKEDC Prepaid", price: 5000, unit: 200 },
                  { name: "EKEDC Prepaid", price: 5500, unit: 350 },
                  { name: "EKEDC Prepaid", price: 1000, unit: 1350 },
                  {
                    name: "EKEDC Postpaid",
                    price: "Pay-As-You-Use",
                    unit: "Per kWh",
                  },
                ],
              },
              {
                id: "KEDCO",
                desco: "KEDCO",
                src: "https://kedco-e60b2.web.app/static/media/kedco-logo.afae8530.png",
                packages: [
                  { name: "KEDCO Prepaid", price: 4000, unit: 180 },
                  { name: "KEDCO Prepaid", price: 5000, unit: 280 },
                  { name: "KEDCO Prepaid", price: 8000, unit: 680 },
                  {
                    name: "KEDCO Postpaid",
                    price: "Pay-As-You-Use",
                    unit: "Per kWh",
                  },
                ],
              },
              {
                id: "EEDC",
                desco: "EEDC",
                src: "https://independent.ng/wp-content/uploads/2018/08/EEDC-EnuguDisco.jpg",
                packages: [
                  { name: "EEDC Prepaid", price: 3500, unit: 150 },
                  { name: "EEDC Prepaid", price: 4500, unit: 350 },
                  { name: "EEDC Prepaid", price: 5500, unit: 550 },
                  {
                    name: "EEDC Postpaid",
                    price: "Pay-As-You-Use",
                    unit: "Per kWh",
                  },
                ],
              },
              {
                id: "IBEDC",
                desco: "IBEDC",
                src: "https://rmi.org/wp-content/uploads/2020/07/ibedc-logo.png",
                packages: [
                  { name: "IBEDC Prepaid", price: 4500, unit: 170 },
                  { name: "IBEDC Prepaid", price: 4500, unit: 470 },
                  { name: "IBEDC Prepaid", price: 4500, unit: 870 },
                  {
                    name: "IBEDC Postpaid",
                    price: "Pay-As-You-Use",
                    unit: "Per kWh",
                  },
                ],
              },
            ],
          },
        };
      });
      this.get("/airtime", () => {
        return {
          data: {
            response: [
              {
                name: "MTN",
                code: "mtnng",
                src: "https://res.cloudinary.com/dfuso5kgt/image/upload/v1680034190/naira.com/New-mtn-logo_mpq64p.jpg",
              },
              {
                name: "AIRTEL",
                code: "airng",
                src: "https://res.cloudinary.com/dfuso5kgt/image/upload/v1679951486/naira.com/download__1_-removebg-preview_fem6sr.png",
              },
              {
                name: "GLO",
                code: "glong",
                src: "https://static-00.iconduck.com/assets.00/globacom-limited-icon-1024x1024-upx9lebq.png",
              },
              {
                name: "9MOBILE",
                code: "eting",
                src: "https://lordtech.com/wp-content/uploads/2021/07/9mobile-1-1-300x300.png",
              },
            ],
          },
        };
      });
      this.get("/transfer/bank-list", () => {
        return {
          data: {
            response: [
              { name: "Access Bank", code: "044" },
              { name: "Citibank", code: "023" },
              { name: "Diamond Bank", code: "063" },
              { name: "Ecobank Nigeria", code: "050" },
              { name: "Fidelity Bank", code: "070" },
              { name: "First Bank of Nigeria", code: "011" },
              { name: "First City Monument Bank", code: "214" },
              { name: "Guaranty Trust Bank", code: "058" },
              { name: "Heritage Bank", code: "030" },
              { name: "Keystone Bank", code: "082" },
              { name: "Providus Bank", code: "101" },
              { name: "Polaris Bank", code: "076" },
              { name: "Stanbic IBTC Bank", code: "221" },
              { name: "Standard Chartered Bank", code: "068" },
              { name: "Sterling Bank", code: "232" },
              { name: "SunTrust Bank", code: "100" },
              { name: "Union Bank of Nigeria", code: "032" },
              { name: "United Bank for Africa", code: "033" },
              { name: "Unity Bank", code: "215" },
              { name: "Wema Bank", code: "035" },
              { name: "Zenith Bank", code: "057" },
            ],
          },
        };
      });
    },
  });
};

// Fetch function for mock data
export const fetchMockData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};
