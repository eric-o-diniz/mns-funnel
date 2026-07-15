import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
  title: {
    default: "Missão Novos Sabores",
    template: "%s | Conexão Nutritiva Kids",
  },
  description:
    "Materiais digitais para criar experiências mais leves e curiosas com alimentos novos.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Conexão Nutritiva Kids",
    title: "Missão Novos Sabores",
    description:
      "Uma trilha sensorial para transformar o próximo alimento novo em uma missão de curiosidade.",
    images: [{ url: socialImage, width: 1536, height: 864, alt: "Missão Novos Sabores - do não à curiosidade" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Missão Novos Sabores",
    description: "Do 'não' à curiosidade com uma trilha sensorial para imprimir.",
    images: [socialImage],
  },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
