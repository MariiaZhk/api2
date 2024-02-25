export const ctrlTryCatchWrapper = (ctrl) => {
  const ctrlWrapper = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return ctrlWrapper;
};
