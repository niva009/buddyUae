import { Dialog, Transition } from "@headlessui/react";
import { CircleArrowLeft, CircleArrowRight, X } from "lucide-react";
import { Fragment } from "react";

export default function ProductLargeViewScreen({
  isOpen,
  setIsOpen,
  activeImage,
  setActiveImage,
  productImages,
}) {
  function closeModal() {
    setIsOpen(false);
  }

  function handleNext() {
    const currentIndex = productImages?.findIndex(
      (image) => image?.image_link === activeImage
    );
    if (currentIndex < productImages?.length - 1) {
      const nextIndex = (currentIndex + 1) % productImages?.length;
      setActiveImage(productImages[nextIndex]?.image_link);
    }
  }

  function handlePrevious() {
    const currentIndex = productImages?.findIndex(
      (image) => image?.image_link === activeImage
    );
    if (currentIndex > 0) {
      const previousIndex =
        (currentIndex - 1 + productImages?.length) % productImages?.length;
      setActiveImage(productImages[previousIndex]?.image_link);
    }
  }

  const currentIndex = productImages?.findIndex(
    (image) => image?.image_link === activeImage
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex overflow-y-auto flex-col-reverse lg:flex-row justify-around lg:justify-between overflow-y-custom relative h-full min-h-screen max-h-screen p-5 lg:p-10 w-full items-center transform overflow-hidden bg-white shadow-xl transition-all">
                <X
                  onClick={closeModal}
                  className="absolute cursor-pointer top-7 text-grey right-7"
                />
                <div className="gallery-container lg:min-h-[520px] max-h-[520px] items-center flex lg:flex-col h-fit gap-3 lg:p-2 overflow-y-auto">
                  {productImages?.map((i) => (
                    <img
                      key={i?.image_link}
                      onClick={() => setActiveImage(i?.image_link)}
                      className={`h-36 w-32 object-contain rounded-sm cursor-pointer ${
                        i?.image_link == activeImage
                          ? "border border-blue"
                          : "border border-black/20"
                      }`}
                      src={i?.image_link}
                      alt=""
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center w-full">
                  <div className="flex items-center gap-10 w-fit">
                    <CircleArrowLeft
                      onClick={handlePrevious}
                      className={`h-12 w-12 cursor-pointer ${
                        currentIndex === 0 ? "text-black/20" : "text-blue"
                      }`}
                    />
                    <img
                      className="lg:h-[27rem] w-[70%] lg:w-full object-contain"
                      src={activeImage}
                    />
                    <CircleArrowRight
                      onClick={handleNext}
                      className={`h-12 w-12 cursor-pointer ${
                        currentIndex === productImages?.length - 1
                          ? "text-black/20"
                          : "text-blue"
                      }`}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
