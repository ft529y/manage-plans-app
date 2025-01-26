import { ModalProps } from '@/common/types';

const Modal = (props: ModalProps) => {
  return props.open ? (
    <>
      <div
        // style={{ top: '350px', right: '650px' }}
        className="animate-scale-in-center fixed inset-0 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          sample sentence
          <h1 className="text-xl font-bold mb-5">{props.title}</h1>
          <p className="text-lg mb-5">{props.content}</p>
          <div className="flex mt-auto w-full">
            <button
              className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
              onClick={() => props.onOk()}
            >
              OK
            </button>
          </div>
        </div>
      </div>
      <div
        className="fixed bg-black bg-opacity-50 w-full h-full z-10"
        onClick={() => props.onCancel()}
      ></div>
    </>
  ) : (
    <></>
  );
};

export default Modal;
