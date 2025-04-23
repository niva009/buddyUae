'use client';

import { Dialog } from "@headlessui/react";
import FormComponent from '../../app/save-address/page'

export default function AddressEditModal({
    open, onOpenChange, addressId
}) {
  const onClose = () => {
    onOpenChange(false); //
  };

  
  console.log("Address ID:", Number(addressId));

  return (
    <Dialog open={!!open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-xl">
          <Dialog.Title className="text-lg font-bold mb-4">Edit Address</Dialog.Title>
          <FormComponent
            addressId={Number(addressId)}  // Ensure this is treated as an integer
            onSuccess={() => {
              onClose(); 
            }}
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
