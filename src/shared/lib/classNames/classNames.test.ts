import { classNames } from "./classNames";

describe('classNames', () => {
    it('должен возвращать только базовый класс, если не переданы модификаторы или дополнительные классы', () => {
        const результат = classNames('base');
        expect(результат).toBe('base');
    });

    it('должен возвращать базовый класс и дополнительные классы, если они переданы', () => {
        const результат = classNames('base', {}, ['additional1', 'additional2']);
        expect(результат).toBe('base additional1 additional2');
    });

    it('должен включать модификаторы, если значение истинное', () => {
        const результат = classNames('base', { mod1: true, mod2: false });
        expect(результат).toBe('base mod1');
    });

    it('должен правильно обрабатывать строковые значения в модификаторах', () => {
        const результат = classNames('base', { mod1: 'active', mod2: 'hidden' });
        expect(результат).toBe('base mod1 mod2');
    });

    it('должен обрабатывать пустые модификаторы и дополнительные классы', () => {
        const результат = classNames('base', {}, []);
        expect(результат).toBe('base');
    });

    it('должен возвращать классы в правильном порядке (базовый -> дополнительные -> модификаторы)', () => {
        const результат = classNames('base', { mod1: true }, ['additional1', 'additional2']);
        expect(результат).toBe('base additional1 additional2 mod1');
    });
});
