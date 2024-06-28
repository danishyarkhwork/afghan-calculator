import { useEffect } from 'react';
import $ from 'jquery';
import 'select2';

const useSelect2 = (ref: React.RefObject<HTMLSelectElement>) => {
  useEffect(() => {
    if (ref.current) {
      $(ref.current).select2({
        theme: 'default',
        width: '100%',
      });
    }

    return () => {
      if (ref.current) {
        $(ref.current).select2('destroy');
      }
    };
  }, [ref]);
};

export default useSelect2;
