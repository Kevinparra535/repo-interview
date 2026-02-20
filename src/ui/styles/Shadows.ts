const Shadows = {
  bankCard: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 5,
  },

  bankButton: {
    // Pencil DS: color #2D7EF855 (opacity≈0.33), blur:16, y:4
    shadowColor: '#2D7EF8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.33,
    shadowRadius: 16,
    elevation: 8,
  },

  inputFocus: {
    // Pencil DS: color #2D7EF830 (opacity≈0.19), blur:12
    shadowColor: '#2D7EF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.19,
    shadowRadius: 12,
    elevation: 4,
  },

  inputError: {
    // Pencil DS: color #FF525225 (opacity≈0.15), blur:12
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },

  cardShadow: {
    // Reference (design): color #0000000F, y:2, blur:8
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  cardShadowStrong: {
    // Reference (design): color #0000001A, y:4, blur:12
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
};

export default Shadows;
