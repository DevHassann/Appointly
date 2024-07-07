import React from "react";

// ICON
import { HiMiniStar } from "react-icons/hi2";

const TestimonialFloat = () => {
  return (
    <section className="bg-white w-fit ring-1 ring-gray-300 px-4 py-4 rounded-3xl">
      <figure className="mx-auto w-[15rem]">
        <p className="sr-only">5 out of 5 stars</p>
        <div className="flex gap-x-1 text-btn-bg-hover">
          <HiMiniStar className="h-5 w-5 flex-none" aria-hidden="true" />
          <HiMiniStar className="h-5 w-5 flex-none" aria-hidden="true" />
          <HiMiniStar className="h-5 w-5 flex-none" aria-hidden="true" />
          <HiMiniStar className="h-5 w-5 flex-none" aria-hidden="true" />
          <HiMiniStar className="h-5 w-5 flex-none" aria-hidden="true" />
        </div>
        <blockquote className="mt-3 text-sm font-semibold leading-8 tracking-tight text-gray-900 sm:text-sm sm:leading-4">
          <p>
            “The simplicity that this platform provides is just awesome, I can
            now conduct meetings with my clients right from my comfort...”
          </p>
        </blockquote>
        <figcaption className="mt-3 flex items-center gap-x-6">
          <img
            className="h-12 w-12 rounded-full bg-gray-50"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80"
            alt=""
          />
          <div className="text-sm leading-6">
            <div className="font-semibold text-gray-900">Judith Black</div>
            <div className="mt-0.5 text-gray-600">CEO of Workcation</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
};

export default TestimonialFloat;
