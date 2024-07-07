import React, { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { currencies, CategoryNavigations } from "../../../Static/Data";

// Function
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CategoryNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        {CategoryNavigations.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-900",
                                "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {CategoryNavigations.categories.map(
                        (category, categoryIdx) => (
                          <Tab.Panel
                            key={category.name}
                            className="space-y-12 px-4 pb-6 pt-10"
                          >
                            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10">
                              <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                                <div>
                                  <p
                                    id={`mobile-featured-heading-${categoryIdx}`}
                                    className="font-medium text-gray-900"
                                  >
                                    Featured
                                  </p>
                                  <ul
                                    aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
                                    className="mt-6 space-y-6"
                                  >
                                    {category.featured.map((item) => (
                                      <li key={item.name} className="flex">
                                        <Link
                                          to={item.href}
                                          className="text-gray-500"
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <p
                                    id="mobile-categories-heading"
                                    className="font-medium text-gray-900"
                                  >
                                    Categories
                                  </p>
                                  <ul
                                    aria-labelledby="mobile-categories-heading"
                                    className="mt-6 space-y-6"
                                  >
                                    {category.categories.map((item) => (
                                      <li key={item.name} className="flex">
                                        <Link
                                          to={item.href}
                                          className="text-gray-500"
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                                <div>
                                  <p
                                    id="mobile-collection-heading"
                                    className="font-medium text-gray-900"
                                  >
                                    Collection
                                  </p>
                                  <ul
                                    aria-labelledby="mobile-collection-heading"
                                    className="mt-6 space-y-6"
                                  >
                                    {category.collection.map((item) => (
                                      <li key={item.name} className="flex">
                                        <Link
                                          to={item.href}
                                          className="text-gray-500"
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <p
                                    id="mobile-brand-heading"
                                    className="font-medium text-gray-900"
                                  >
                                    Brands
                                  </p>
                                  <ul
                                    aria-labelledby="mobile-brand-heading"
                                    className="mt-6 space-y-6"
                                  >
                                    {category.brands.map((item) => (
                                      <li key={item.name} className="flex">
                                        <Link
                                          to={item.href}
                                          className="text-gray-500"
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </Tab.Panel>
                        )
                      )}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {CategoryNavigations.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <Link
                          to={page.href}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {page.name}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <Link
                        to="#"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create an account
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        to="#"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {/* Currency selector */}
                    <form>
                      <div className="inline-block">
                        <label htmlFor="mobile-currency" className="sr-only">
                          Currency
                        </label>
                        <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                          <select
                            id="mobile-currency"
                            name="currency"
                            className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                          >
                            {currencies.map((currency) => (
                              <option key={currency}>{currency}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                            <ChevronDownIcon
                              className="h-5 w-5 text-gray-500"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative">
          <nav aria-label="Top">
            {/* Top navigation */}

            {/* Secondary navigation */}
            <div className="bg-white">
              <div className="mx-auto max-w-full">
                <div className="border-y border-gray-200">
                  <div
                    id="catNav"
                    className="flex h-8 items-center justify-between"
                  >
                    <div className="hidden h-full lg:flex lg:w-full lg:justify-center lg:overflow-x-hidden">
                      {/* Mega menus */}
                      <Popover.Group className="ml-8">
                        <div className="flex h-full justify-center space-x-12">
                          {CategoryNavigations.categories.map(
                            (category, categoryIdx) => (
                              <Popover
                                key={category.name}
                                className="flex my-[1px]"
                              >
                                {({ open }) => (
                                  <>
                                    <div className="relative flex">
                                      <Popover.Button
                                        className={classNames(
                                          open
                                            ? "text-text-secondary border-text-secondary"
                                            : "border-transparent text-gray-700 hover:text-gray-800",
                                          "relative outline-none whitespace-nowrap z-2 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                        )}
                                      >
                                        {category.name}
                                      </Popover.Button>
                                    </div>

                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-200"
                                      enterFrom="opacity-0"
                                      enterTo="opacity-100"
                                      leave="transition ease-in duration-150"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Popover.Panel className="absolute inset-x-0 top-full text-gray-500 sm:text-sm">
                                        <div
                                          className="absolute inset-0 top-1/2 bg-white shadow"
                                          aria-hidden="true"
                                        />

                                        <div className="relative bg-white">
                                          <div className="mx-auto max-w-7xl px-8">
                                            <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                <div>
                                                  <p
                                                    id={`desktop-featured-heading-${categoryIdx}`}
                                                    className="font-medium text-gray-900"
                                                  >
                                                    Featured
                                                  </p>
                                                  <ul
                                                    aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                  >
                                                    {category.featured.map(
                                                      (item) => (
                                                        <li
                                                          key={item.name}
                                                          className="flex"
                                                        >
                                                          <Link
                                                            to={item.href}
                                                            className="hover:text-gray-800"
                                                          >
                                                            {item.name}
                                                          </Link>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </div>
                                                <div>
                                                  <p
                                                    id="desktop-categories-heading"
                                                    className="font-medium text-gray-900"
                                                  >
                                                    Categories
                                                  </p>
                                                  <ul
                                                    aria-labelledby="desktop-categories-heading"
                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                  >
                                                    {category.categories.map(
                                                      (item) => (
                                                        <li
                                                          key={item.name}
                                                          className="flex"
                                                        >
                                                          <Link
                                                            to={item.href}
                                                            className="hover:text-gray-800"
                                                          >
                                                            {item.name}
                                                          </Link>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </div>
                                              </div>
                                              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                <div>
                                                  <p
                                                    id="desktop-collection-heading"
                                                    className="font-medium text-gray-900"
                                                  >
                                                    Collection
                                                  </p>
                                                  <ul
                                                    aria-labelledby="desktop-collection-heading"
                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                  >
                                                    {category.collection.map(
                                                      (item) => (
                                                        <li
                                                          key={item.name}
                                                          className="flex"
                                                        >
                                                          <Link
                                                            to={item.href}
                                                            className="hover:text-gray-800"
                                                          >
                                                            {item.name}
                                                          </Link>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </div>

                                                <div>
                                                  <p
                                                    id="desktop-brand-heading"
                                                    className="font-medium text-gray-900"
                                                  >
                                                    Brands
                                                  </p>
                                                  <ul
                                                    aria-labelledby="desktop-brand-heading"
                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                  >
                                                    {category.brands.map(
                                                      (item) => (
                                                        <li
                                                          key={item.name}
                                                          className="flex"
                                                        >
                                                          <Link
                                                            to={item.href}
                                                            className="hover:text-gray-800"
                                                          >
                                                            {item.name}
                                                          </Link>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Popover.Panel>
                                    </Transition>
                                  </>
                                )}
                              </Popover>
                            )
                          )}
                        </div>
                      </Popover.Group>
                    </div>

                    {/* Mobile menu and search (lg-) */}
                    <div className="flex flex-1 items-center lg:hidden">
                      <button
                        type="button"
                        className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setOpen(true)}
                      >
                        <span className="sr-only">Open menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default CategoryNavigation;
