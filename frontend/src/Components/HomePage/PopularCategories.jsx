import React from "react";

import { posts } from "../../Static/Data";

const PopularCategories = () => {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl xl:max-w-full px-6 lg:px-8">
        <div className="mx-auto max-w-2xl 2xl:max-w-4xl text-center">
          <h2 className="text-3xl 2xl:text-6xl font-bold tracking-tight text-text-main sm:text-4xl">
            Popular Services
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group/tile relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-4 pb-8 pt-48 sm:pt-36 lg:pt-40"
            >
              <img
                src={post.imageUrl}
                alt=""
                className="absolute group-hover/tile:scale-110 transition-transform duration-500 inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300"></div>
              <h3 className="mt-3 text-5xl font-light leading-6 text-white">
                <a href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                  <p className="text-xs font-semibold mt-4">
                    {post.services} Services
                  </p>
                </a>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
