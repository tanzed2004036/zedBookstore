import React from "react";

function Footer() {
  return (
    <div className="mt-4 ">
      <footer className=" bottom-0  footer flex flex-col sm:flex-row justify-between items-center bg-neutral text-neutral-content p-10 gap-8">
        {/* Left Side: Name */}
        <aside className="text-center sm:text-left">
          <p className="text-lg font-semibold">Tanzed Hasan</p>
          <p className="text-sm">Founder, ZED Bookstore</p>
        </aside>

        {/* Center: Social Icons */}
        <div className="flex flex-col items-center gap-2">
          <h6 className="footer-title">Follow Us</h6>
          <div className="flex gap-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/tanzedhasan.19"
              target="_blank"
              rel="noreferrer"
              title="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#1877F2"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326V22.67c0 .732.593 1.325 1.325 1.325h11.498v-9.846H9.847v-3.841h2.976V8.412c0-2.944 1.796-4.554 4.42-4.554 1.256 0 2.336.093 2.651.135v3.07l-1.82.001c-1.428 0-1.703.678-1.703 1.67v2.188h3.406l-.444 3.841h-2.962V24h5.804c.73 0 1.323-.593 1.323-1.325V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/tanzedhasan?igsh=MXNxbjdsODltZWVvMA=="
              target="_blank"
              rel="noreferrer"
              title="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <defs>
                  <linearGradient
                    id="ig-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="25%" stopColor="#e6683c" />
                    <stop offset="50%" stopColor="#dc2743" />
                    <stop offset="75%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#ig-gradient)"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.427.403a4.919 4.919 0 011.675 1.09 4.919 4.919 0 011.09 1.675c.163.457.349 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.427a4.919 4.919 0 01-1.09 1.675 4.919 4.919 0 01-1.675 1.09c-.457.163-1.257.349-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.427-.403a4.919 4.919 0 01-1.675-1.09 4.919 4.919 0 01-1.09-1.675c-.163-.457-.349-1.257-.403-2.427-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.427a4.919 4.919 0 011.09-1.675 4.919 4.919 0 011.675-1.09c.457-.163 1.257-.349 2.427-.403 1.266-.058 1.646-.07 4.85-.07zm0 1.837c-3.17 0-3.548.012-4.797.07-1.08.051-1.668.227-2.063.377-.518.2-.89.44-1.281.831a3.08 3.08 0 00-.83 1.281c-.15.395-.327.983-.377 2.063-.058 1.249-.07 1.627-.07 4.797s.012 3.548.07 4.797c.051 1.08.227 1.668.377 2.063.2.518.44.89.831 1.281.39.391.763.631 1.281.831.395.15.983.327 2.063.377 1.249.058 1.627.07 4.797.07s3.548-.012 4.797-.07c1.08-.051 1.668-.227 2.063-.377.518-.2.89-.44 1.281-.831.391-.39.631-.763.831-1.281.15-.395.327-.983.377-2.063.058-1.249.07-1.627.07-4.797s-.012-3.548-.07-4.797c-.051-1.08-.227-1.668-.377-2.063a3.08 3.08 0 00-.831-1.281 3.08 3.08 0 00-1.281-.831c-.395-.15-.983-.327-2.063-.377-1.249-.058-1.627-.07-4.797-.07zM12 5.838a6.162 6.162 0 110 12.324 6.162 6.162 0 010-12.324zm0 1.837a4.325 4.325 0 100 8.65 4.325 4.325 0 000-8.65zm6.406-1.202a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z"
                />
              </svg>
            </a>           
            {/* linkedin */}
            <a
              href="https://www.linkedin.com/in/k-m-tanzed-hasan-275502345/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#0A66C2"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.67-1.3 2.3-2.7 4.7-2.7 5 0 5.9 3.3 5.9 7.6V24h-5v-7.6c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.9 2-2.9 4V24h-5V8z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Contact Info */}
        <aside className="text-center sm:text-right">
          <p className="text-sm">📞 01312428756</p>
          <p className="text-sm">✉️ kmtanzedhasan26@gmail.com</p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
