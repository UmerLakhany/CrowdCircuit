import HeroSection from "./sections/HeroSection";
import FeaturedEvents from "./sections/FeaturedEvents";
import BrowseCategories from "./sections/BrowseCategories";
import TrendingEvents from "./sections/TrendingEvents";
import UpcomingEvents from "./sections/UpcomingEvents";
import EventsNearYou from "./sections/EventsNearYou";
import Newsletter from "./sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedEvents />
      <BrowseCategories />
      <TrendingEvents />
      <UpcomingEvents />
      <EventsNearYou />
      <Newsletter />
    </>
  );
}
