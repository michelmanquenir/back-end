const { getDatosDummy } = require('../src/controllers/user.controller');

test('getDatosDummy', async () => {
    const result = await getDatosDummy();

    expect(result).toHaveLength(2);
}
);