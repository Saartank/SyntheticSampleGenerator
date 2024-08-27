export default function ImageDisplay({ images, isSample }) {
  return (
    <div className="mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-2 text-center">
              {isSample
                ? "Sample Image - Cell Sample"
                : "Generated Cell Sample"}
            </p>
            <img
              src={images.cell_sample_yellow_url}
              alt={isSample ? "Sample Image" : "Generated Cell Sample"}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-2 text-center">
              {isSample
                ? "Sample Image - Segmentation Label"
                : "Generated Segmentation Label"}
            </p>
            <img
              src={images.label_image_colored_url}
              alt={isSample ? "Sample Image" : "Generated Segmentation Label"}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
