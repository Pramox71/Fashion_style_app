import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import Header from './layouts/header';
import Button from '@renderer/components/Button';
import { Link } from '@renderer/router';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import model1 from '@renderer/assets/model/model1.jpg';
import model2 from '@renderer/assets/model/model2.jpg';
import model3 from '@renderer/assets/model/model3.jpg';

const CombinedView = () => {
    const location = useLocation();
    const { photo } = location.state || {};
    const [activeModelIndex, setActiveModelIndex] = useState(-1);

    const models = [
        { id: 1, name: 'Model 1', image: model1 },
        { id: 2, name: 'Model 2', image: model2 },
        { id: 3, name: 'Model 3', image: model3 },
        { id: 4, name: 'Model 4', image: model1 },
        { id: 5, name: 'Model 5', image: model2 },
        { id: 6, name: 'Model 6', image: model3 },
    ];

    const handleGenerate = () => {
        if (activeModelIndex === -1) {
            toast.error('Silahkan ambil foto terlebih dahulu!');
        } else {
            console.log('Generated process started');
        }
    };
    return (
        <div className="w-full h-screen bg-white flex flex-col">
            <Header />

            <div className="flex flex-1 pt-14">
                {/* Camera Preview */}
                <div className="w-2/3 p-4 flex flex-col">
                    {photo ? (
                        <img src={photo} alt="Selected" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <Link to="/photo" className="flex-1 aspect-[3/4] border-2 border-dashed border-[#0095FF] rounded-lg flex items-center justify-center bg-white hover:bg-gray-100 transition-colors duration-300">
                            <div className="text-center text-[#0095FF]/30">
                                <Camera className="w-12 h-12 mx-auto mb-2" />
                                <p className="text-base">Ambil foto model</p>
                            </div>
                        </Link>
                    )}

                    <div className="mt-4 space-y-3">
                        <Button
                            variant="primary"
                            onClick={handleGenerate}
                        >
                            Generate
                        </Button>
                        <Button
                            variant="secondary"
                        >
                            Hapus
                        </Button>
                    </div>
                </div>

                {/* Model Picker */}
                <div className="w-1/3 h-[calc(100vh-3.5rem)] overflow-y-auto scrollbar-thin">
                    <div className="p-4 space-y-4">
                        {models.map((model, index) => (
                            <div
                                key={model.id}
                                className={`relative rounded-lg overflow-hidden cursor-pointer ${activeModelIndex === index ? 'ring-2 ring-blue-500' : ''
                                    }`}
                                onClick={() => setActiveModelIndex(index)}
                            >
                                <div className="aspect-[3/4] relative">
                                    <img
                                        src={model.image}
                                        alt={model.name}
                                        className={`w-full h-full object-cover ${activeModelIndex === index ? '' : 'brightness-75'
                                            }`}
                                    />
                                    {activeModelIndex !== index && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white text-lg font-medium">
                                                {model.name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CombinedView;
