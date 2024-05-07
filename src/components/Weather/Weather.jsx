import "./Weather.css";
import InteractiveButton from "../InteractiveButton/InteractiveButton";

export default function Weather({ toggleModal }) {
  return (
    <div className="Weather">
      <InteractiveButton
        className="InteractiveWeather"
        onClick={toggleModal}
        buttonDescription={
          <svg className="weather--svg" id="outputsvg" viewBox="0 0 5120 5120">
            <g>
              <g>
                <path d="M3794 4586 c-97 -31 -121 -55 -481 -458 l-353 -397 -68 40 c-123 72 -292 129 -457 154 -307 46 -643 -18 -899 -172 -338 -203 -566 -521 -647 -903 -32 -150 -32 -400 0 -550 41 -192 117 -366 229 -522 l55 -77 28 79 c15 43 30 84 33 89 4 5 -10 36 -30 67 -104 162 -170 372 -181 573 -30 579 348 1090 916 1238 119 31 336 42 461 24 452 -66 841 -393 979 -821 108 -335 65 -708 -114 -998 l-43 -71 32 -91 32 -90 46 62 c149 206 234 432 259 691 26 267 -38 571 -168 791 l-34 59 23 22 c13 12 185 166 383 342 198 176 370 331 382 344 12 13 34 51 50 84 23 51 28 73 28 145 0 74 -4 93 -31 150 -62 130 -168 202 -308 207 -49 2 -97 -2 -122 -11z"></path>
                <path d="M2191 3053 c-19 -8 -201 -255 -341 -463 -270 -403 -439 -723 -512 -970 -32 -106 -32 -290 0 -409 88 -327 333 -573 657 -663 118 -32 356 -32 470 0 171 49 342 154 450 277 166 189 259 469 227 685 -32 224 -194 563 -470 985 -108 167 -338 489 -378 532 -30 32 -65 41 -103 26z m170 -1119 c181 -53 329 -204 368 -374 17 -75 13 -201 -9 -272 -49 -160 -180 -290 -345 -341 -215 -66 -451 22 -577 217 -134 207 -94 494 90 657 53 46 144 96 212 115 65 18 196 17 261 -2z"></path>
              </g>
            </g>
          </svg>
        }
      />
      <div className="Weather--info">
        <img src="/src/images/09d.svg" alt="ico" />
      </div>
      <div className="Weather--info">
        <p>14.3 °C</p>
      </div>
      <div className="Weather--info winter">
        <img src="/src/images/wind.svg" alt="ico" />
        <span>12km/h</span>
      </div>
    </div>
  );
}
