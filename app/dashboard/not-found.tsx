import { Error404 } from "@/components/ui/pixeleted-404-not-found";

export default function Error404Demo() {
  return (
    <Error404
      postcardImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/statue-of-liberty-oil-pastel-MndxxUm4uk78xLAAKqtCFXH2HmNn0h.jpg"
      postcardAlt="New York City Postcard with Statue of Liberty"
      curvedTextTop="The General Intelligence"
      curvedTextBottom="of New York"
      heading="(404) Looks like the page you're looking for got lost somewhere."
      subtext="But hey — in New York, even the unexpected detours lead somewhere."
      backButtonLabel="Back to Home"
      backButtonHref="/"
    />
  );
}
