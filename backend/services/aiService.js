import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const POLYCLINICS = [
  {
    key: "General physician",
    keywords: [
      "ateş",
      "grip",
      "soğuk algınlığı",
      "öksürük",
      "baş ağrısı",
      "yorgunluk",
      "fever",
      "cold",
      "cough",
      "headache",
      "fatigue",
    ],
  },
  {
    key: "Gynecologist",
    keywords: [
      "adet",
      "regl",
      "vajina",
      "hamile",
      "gebelik",
      "doğum",
      "kadın",
      "menstruation",
      "pregnancy",
      "birth",
      "gynecology",
      "woman",
    ],
  },
  {
    key: "Dermatologist",
    keywords: [
      "cilt",
      "deri",
      "kaşıntı",
      "sivilce",
      "egzama",
      "leke",
      "acne",
      "itch",
      "eczema",
      "skin",
      "rash",
    ],
  },
  {
    key: "Pediatricians",
    keywords: [
      "çocuk",
      "bebek",
      "çocuk doktoru",
      "ateşli çocuk",
      "pediatri",
      "child",
      "baby",
      "pediatric",
      "infant",
    ],
  },
  {
    key: "Neurologist",
    keywords: [
      "nöroloji",
      "baş dönmesi",
      "epilepsi",
      "felç",
      "kas",
      "sinir",
      "bayılma",
      "migren",
      "dizziness",
      "epilepsy",
      "stroke",
      "nerve",
      "migraine",
      "seizure",
    ],
  },
];

function matchPolyclinic(text) {
  text = text.toLowerCase();
  let best = null,
    max = 0;
  for (const poly of POLYCLINICS) {
    let score = poly.keywords.filter((k) => text.includes(k)).length;
    if (score > max) {
      best = poly.key;
      max = score;
    }
  }
  return best;
}

export const aiService = {
  async diagnose(content) {
    const lang = /[çğıöşüÇĞİÖŞÜ]/.test(content) ? "tr" : "en";
    const poly = matchPolyclinic(content);
    let prompt = "";
    if (lang === "tr") {
      prompt = `Kullanıcı hastalığını şöyle tarif etti: '${content}'. Bu şikayete en uygun poliklinik: ${
        poly ? poly : "Bilinmiyor"
      }. Kısa bir teşhis cümlesi kur ve kullanıcıyı bu polikliniğe yönlendir. Sadece poliklinik adını ve yönlendirme cümleni ver.`;
    } else {
      prompt = `The user described their illness as: '${content}'. The most suitable polyclinic for this complaint is: ${
        poly ? poly : "Unknown"
      }. Write a short diagnosis sentence and direct the user to this polyclinic. Only give the polyclinic name and your direction sentence.`;
    }
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return { polyclinic: poly, text, lang };
  },
};
