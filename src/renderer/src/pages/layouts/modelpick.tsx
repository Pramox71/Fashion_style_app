import React from 'react';

interface Model {
  id: number;
  image: string;
  name: string;
}

interface ModelPickerProps {
  selectedModel?: Model;
  activeModelIndex: number;
  onModelSelect: (model: Model, index: number) => void;
}

const ModelPicker: React.FC<ModelPickerProps> = ({
  selectedModel,
  activeModelIndex,
  onModelSelect}) => {
  const modelsExample = [
    {
      id: 1,
      image: '/api/placeholder/400/600',
      name: 'Model 1'
    },
    {
      id: 2,
      image: '/api/placeholder/400/600',
      name: 'Model 2'
    },
    {
      id: 3,
      image: '/api/placeholder/400/600',
      name: 'Model 3'
    }
  ];

  return (
    <div className="w-[300px] h-full flex flex-col bg-white shadow-lg">

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {modelsExample.map((model, index) => (
            <div
              key={model.id}
              className={`
                bg-white rounded-lg
                transition-all duration-300 cursor-pointer
                overflow-hidden relative
                ${activeModelIndex === index
                  ? 'ring-2 ring-blue-500 shadow-lg scale-105'
                  : 'hover:bg-gray-50 shadow-sm'}
              `}
              onClick={() => onModelSelect(model, index)}
            >
              <img
                src={model.image}
                alt={model.name}
                className={`
                  w-full h-[200px] object-cover
                  transition-all duration-300
                  ${activeModelIndex === index ? 'filter-none' : 'brightness-75'}
                `}
              />
              {activeModelIndex !== index && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-700 text-lg font-medium">
                    {model.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelPicker;