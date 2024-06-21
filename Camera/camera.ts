interface CameraCharacteristics {
	rangeOfSubjectDistances: [number, number];
	rangeOfLightLevels: [number, number];
}
  
interface HardwareCamera {
	name: string;
	characteristics: CameraCharacteristics;
}

function canSatisfyRequirements(
  desiredCharacteristics: CameraCharacteristics,
  hardwareCameras: HardwareCamera[]
): boolean {
  return hardwareCameras.some(camera => {
    const { rangeOfSubjectDistances, rangeOfLightLevels } = camera.characteristics;
    const subjectDistanceSufficient = rangeOfSubjectDistances[0] <= desiredCharacteristics.rangeOfSubjectDistances[0] &&
                                       rangeOfSubjectDistances[1] >= desiredCharacteristics.rangeOfSubjectDistances[1];
    const lightLevelSufficient = rangeOfLightLevels[0] <= desiredCharacteristics.rangeOfLightLevels[0] &&
                                 rangeOfLightLevels[1] >= desiredCharacteristics.rangeOfLightLevels[1];
    return subjectDistanceSufficient && lightLevelSufficient;
  });
}

// Example usage
const desiredCharacteristics: CameraCharacteristics = {
  rangeOfSubjectDistances: [1, 10],
  rangeOfLightLevels: [100, 1000]
};

const hardwareCameras: HardwareCamera[] = [
  {
    name: 'Camera A',
    characteristics: {
      rangeOfSubjectDistances: [0, 15],
      rangeOfLightLevels: [50, 1500]
    }
  },
  {
    name: 'Camera B',
    characteristics: {
      rangeOfSubjectDistances: [5, 10],
      rangeOfLightLevels: [200, 800]
    }
  }
];

const result = canSatisfyRequirements(desiredCharacteristics, hardwareCameras);
console.log(`Can the hardware cameras satisfy the requirements? ${result}`);