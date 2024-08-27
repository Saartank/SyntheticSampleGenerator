export default function ParameterControl({
  numCells,
  setNumCells,
  imageSize,
  setImageSize,
  avgDiameter,
  setAvgDiameter,
  noiseLevel,
  setNoiseLevel,
  blurLevel,
  setBlurLevel,
  deformationFactor,
  setDeformationFactor,
  roughnessFactor,
  setRoughnessFactor,
  fluorescenceLevel,
  setFluorescenceLevel,

  handleGenerate,
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Adjust Parameters
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block font-medium text-gray-700">
            Number of Cells
          </label>
          <input
            type="number"
            value={numCells}
            onChange={(e) => setNumCells(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Image Size (px)
          </label>
          <input
            type="number"
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Average Diameter (px)
          </label>
          <input
            type="number"
            value={avgDiameter}
            onChange={(e) => setAvgDiameter(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Fluorescence Level
          </label>
          <input
            type="number"
            step="0.1"
            value={fluorescenceLevel}
            onChange={(e) => setFluorescenceLevel(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Noise Level</label>
          <input
            type="number"
            step="0.1"
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Blur Level</label>
          <input
            type="number"
            step="0.1"
            value={blurLevel}
            onChange={(e) => setBlurLevel(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Elliptical Deformation Factor
          </label>
          <input
            type="number"
            step="0.1"
            value={deformationFactor}
            onChange={(e) => setDeformationFactor(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Roughness Factor
          </label>
          <input
            type="number"
            step="0.1"
            value={roughnessFactor}
            onChange={(e) => setRoughnessFactor(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
      </div>
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 w-full mt-6"
      >
        Generate Sample
      </button>
    </div>
  );
}
