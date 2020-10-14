import 'regenerator-runtime/runtime';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import 'snapshot-diff/extend-expect';

configure({ adapter: new Adapter() });
