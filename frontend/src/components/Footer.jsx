import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#152238]/10 bg-[#152238] text-[#fff8ef]">
      <div className="container px-4 py-10 mx-auto">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="text-2xl font-extrabold tracking-tight">CollegeFinder</p>
            <p className="mt-1 text-sm text-[#fff8ef]/75">Admissions, clarity, and confidence in one place.</p>
          </div>
          <div className="flex items-center gap-5 text-sm font-semibold">
            <Link to="/privacy" className="transition hover:text-[#fb923c]">Privacy Policy</Link>
            <Link to="/terms" className="transition hover:text-[#fb923c]">Terms of Service</Link>
            <Link to="/contact" className="transition hover:text-[#fb923c]">Contact</Link>
          </div>
        </div>
        <p className="pt-6 mt-6 text-xs text-center border-t text-[#fff8ef]/60 border-[#fff8ef]/15">
          &copy; 2026 CollegeFinder. Built by Subhadeep Mondal.
        </p>
      </div>
    </footer>
  );
}