"use client";

import AddressForm from "./AddressForm";
import { Address } from "@/types/domain";

interface AddressStepProps {
  origin: Address;
  destination: Address;
  onOriginChange: (data: Partial<Address>) => void;
  onDestinationChange: (data: Partial<Address>) => void;
}

const AddressStep = ({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
}: AddressStepProps) => {
  return (
    <div className="flex gap-8">
      <AddressForm
        title="Origin address"
        value={origin}
        onChange={onOriginChange}
      />

      <AddressForm
        title="Destination address"
        value={destination}
        onChange={onDestinationChange}
      />
    </div>
  );
};

export default AddressStep;
