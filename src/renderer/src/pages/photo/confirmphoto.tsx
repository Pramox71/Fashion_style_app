import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@renderer/components/Button';
import Header from '../layouts/header';

interface LocationState {
    photo?: string;
}

const ConfirmPhoto = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;
    const photoSrc = state?.photo;

    const handleConfirm = () => {
        navigate('/combinedview', { state: { photo: photoSrc } });
    };

    if (!photoSrc) {
        navigate('/photo');
        return null;
    }

    return (
        <div className="w-full min-h-screen bg-white flex flex-col overflow-hidden">
            <Header />
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center bg-black">
                    <img
                        src={photoSrc}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <Button
                onClick={handleConfirm}
                variant="primary"
                className='w-full fixed bottom-0 left-0 rounded-none font-bold'
            >
                OK
            </Button>

            {/* Confirm Modal
            {showConfirmModal && (
                <ConfirmCustom
                    title="Konfirmasi"
                    message="Apakah anda ingin melanjutkan dengan foto ini?"
                    onClose={handleProceedWithoutPhoto}
                    onConfirm={handleProceedWithPhoto}
                    icon={<HelpCircle className="w-12 h-12 text-yellow-500" />}
                />
            )} */}

        </div>
    );
};

export default ConfirmPhoto;
