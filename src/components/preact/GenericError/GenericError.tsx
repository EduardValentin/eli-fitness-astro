import SvgWarning from '../icons/Warning';

export const GenericError = () => {
    return (
        <div class="flex flex-col items-center justify-center border border-red-200 bg-red-100 p-5">
            <div class="flex gap-5 items-center justify-center mb-5">
                <SvgWarning width={20} class="fill-red-700" />
                <h4 class="text-xl text-center text-red-700">
                    Something went wrong
                </h4>
            </div>
            <p class="text-[0.85rem]/[150%] text-center mb-6 text-red-600">
                Please try again later or contact us at{' '}
                <a href="mailto:contact@elipersonaltrainer.com">
                    contact@elipersonaltrainer.com
                </a>
            </p>
        </div>
    );
};
