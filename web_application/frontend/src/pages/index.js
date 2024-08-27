import { useState } from "react";
import { generateSampleImages } from "../lib/api";
import ImageDisplay from "../components/ImageDisplay";
import ParameterControl from "../components/ParameterControl";
import Spinner from "../components/Spinner";

export default function Home() {
  const [numCells, setNumCells] = useState(30);
  const [imageSize, setImageSize] = useState(512);
  const [avgDiameter, setAvgDiameter] = useState(60);
  const [noiseLevel, setNoiseLevel] = useState(0.1);
  const [blurLevel, setBlurLevel] = useState(0.5);
  const [deformationFactor, setDeformationFactor] = useState(0.2);
  const [roughnessFactor, setRoughnessFactor] = useState(0.5);
  const [fluorescenceLevel, setFluorescenceLevel] = useState(0.5);

  const [images, setImages] = useState({
    cell_sample_yellow_url:
      "https://webscraped-images-bucket.s3.us-east-2.amazonaws.com/cells_image_yellow_95cc671e-ad6d-41cf-97d2-b13db5a18dd8.png",
    label_image_colored_url:
      "https://webscraped-images-bucket.s3.us-east-2.amazonaws.com/label_image_colored_6b6c55b2-d1f1-4aca-89ab-14f151eb716b.png",
  });
  const [isSample, setIsSample] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const params = {
        num_cells: numCells,
        image_size: imageSize,
        avg_diameter: avgDiameter,
        noise_level: noiseLevel,
        blur_level: blurLevel,
        deformation_factor: deformationFactor,
        roughness_factor: roughnessFactor,
        fluorescence_level: fluorescenceLevel,
      };

      const result = await generateSampleImages(params);
      setImages(result);
      setIsSample(false);
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-12 max-w-5xl w-full">
        <h1 className="text-6xl font-bold text-center mb-12 text-gray-800">
          Synthetic Sample Generator
        </h1>

        <ParameterControl
          numCells={numCells}
          setNumCells={setNumCells}
          imageSize={imageSize}
          setImageSize={setImageSize}
          avgDiameter={avgDiameter}
          setAvgDiameter={setAvgDiameter}
          noiseLevel={noiseLevel}
          setNoiseLevel={setNoiseLevel}
          blurLevel={blurLevel}
          setBlurLevel={setBlurLevel}
          deformationFactor={deformationFactor}
          setDeformationFactor={setDeformationFactor}
          roughnessFactor={roughnessFactor}
          setRoughnessFactor={setRoughnessFactor}
          fluorescenceLevel={fluorescenceLevel}
          setFluorescenceLevel={setFluorescenceLevel}
          handleGenerate={handleGenerate}
        />

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Spinner />
          </div>
        ) : (
          <ImageDisplay images={images} isSample={isSample} />
        )}
      </div>
    </div>
  );
}
