import Button, { type Props as ButtonProps } from '../Button/Button.tsx';
import { useState } from 'preact/hooks';
import Modal from '../Modal/Modal.tsx';

import useSubmitApplication from './useSubmitApplication.ts';
import ApplicationForm from './ApplicationForm.tsx';
import { GenericError } from '../GenericError/GenericError.tsx';
import { CheckIcon } from '@heroicons/react/20/solid';
import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    type TabProps,
} from '@headlessui/react';
import Price from './Price.tsx';
import type { PlanType } from './ServicesCard.tsx';

interface Props {
    planType: PlanType;
    buttonText: string;
    items: string[];
    price?: number;
    important?: boolean;
}

export type Pack = 'single' | 'three-months' | 'six-months';
type PackOption = {
    value: Pack;
    label: string;
};
const packOptions: PackOption[] = [
    {
        value: 'single',
        label: 'Monthly',
    },
    {
        value: 'three-months',
        label: '3 Months',
    },
    {
        value: 'six-months',
        label: '6 Months',
    },
];

const StyledTab = (props: TabProps) => {
    return (
        <Tab
            class="flex-1 bg-purple-400 border-r text-white text-sm border-purple-300 data-[selected]:bg-purple-800 data-[selected]:scale-110 transition-all ease-in duration-75 data-[selected]:text-white py-2 px-3 font-raleway font-semibold last-of-type:border-none"
            {...props}
        />
    );
};

const PopularServicesCard = (props: Props) => {
    const { planType, buttonText, items } = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [pack, setPack] = useState<Pack>('three-months');

    const buttonProps: ButtonProps = {
        color: 'pink',
        class: 'border-pink mt-auto from-purple-500 bg-gradient-to-r to-purple-900 hover:from-purple-400 hover:to-purple-800',
    };

    const { isError, isSubmitted, submitApplication, reset } =
        useSubmitApplication();

    const renderFormContent = () => {
        if (isSubmitted) {
            return (
                <div class="flex flex-col items-center justify-center">
                    <h4 class="text-xl font-semibold text-center mb-5 text-black/80">
                        Thank you for applying!
                    </h4>
                    <p class="text-[0.85rem]/[150%] text-center mb-6">
                        You have successfully applied for the{' '}
                        <span class="font-raleway font-bold capitalize">
                            {planType}
                        </span>{' '}
                        plan. I'll reach out to you as soon as possible to
                        discuss the next steps.
                    </p>
                </div>
            );
        }
        if (isError) {
            return <GenericError />;
        }

        return (
            <>
                <h4 class="text-xl font-semibold text-center mb-5 text-black/80">
                    Great choice!
                </h4>
                <p class="text-[0.85rem]/[150%] text-center mb-6">
                    In order to apply, for the{' '}
                    <span class="font-raleway font-bold">{planType}</span> plan,
                    please fill in the information bellow and I'll reach out to
                    you as soon as possible
                </p>

                <ApplicationForm
                    pack={pack}
                    planType={planType}
                    onSubmit={submitApplication}
                    onCancel={() => setModalOpen(false)}
                />
            </>
        );
    };

    const selectedIndex = packOptions.findIndex((o) => o.value === pack);

    return (
        <div class="from-purple-50 from-10% bg-gradient-to-r via-purple-100 via-50% to-purple-300 to-100 relative flex flex-col gap-5 p-5 text-black md:w-[25rem] w-full">
            {planType && (
                <div class="flex justify-between">
                    <h2 class="font-semibold text-xl capitalize">{planType}</h2>

                    <div class="text-sm text-black font-raleway font-semibold w-fit py-1 px-4 self-end bg-white rounded-full">
                        Most popular
                    </div>
                </div>
            )}

            <div class="font-raleway text-md">
                Save by getting multiple months
            </div>
            <TabGroup
                selectedIndex={selectedIndex}
                onChange={(index) => {
                    const opt = packOptions[index];
                    if (opt) {
                        setPack(opt.value);
                    }
                }}
            >
                <TabList class="flex mb-5">
                    {packOptions.map((o) => (
                        <StyledTab key={o.value}>{o.label}</StyledTab>
                    ))}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Price monthly price={120} />
                    </TabPanel>
                    <TabPanel>
                        <Price price={330} full={360} />
                    </TabPanel>
                    <TabPanel>
                        <Price price={624} full={724} />
                    </TabPanel>
                </TabPanels>
            </TabGroup>

            <hr />

            <ul class="flex-1">
                {items.map((item) => (
                    <li class="text-slate-700 p-2 text-sm flex gap-5 justify-start">
                        <CheckIcon class="w-5 shrink-0 fill-green-500" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
            <hr />
            <Button
                class="border-2 mt-auto border-black"
                color="black"
                onClick={() => {
                    setModalOpen(true);
                }}
                {...buttonProps}
            >
                {buttonText}
            </Button>
            <Modal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    reset();
                }}
            >
                <div>{renderFormContent()}</div>
            </Modal>
        </div>
    );
};

export default PopularServicesCard;
