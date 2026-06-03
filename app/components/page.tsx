import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Services from "@/app/components/Services";
import WhoWeServe from "@/app/components/WhoWeServe";
import WhyUs from "@/app/components/WhyUs";
import QuoteForm from "@/app/components/QuoteForm";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhoWeServe />
        <WhyUs />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}
