import { ICreatePostFormProps, IWrappedComponent } from '@/types/form';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

interface ImageResizeModule {
  parchment: unknown;
  modules: string[];
}

const ReactQuillBase = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    const { ImageResize } = await import('quill-image-resize-module-ts');
    RQ.Quill.register('modules/imageResize', ImageResize);

    return function forwardRef({ forwardedRef, ...props }: IWrappedComponent) {
      const newProps = {
        ...props,
        modules: {
          ...props.modules,
          imageResize: {
            parchment: RQ.Quill.import('parchment'),
            modules: ['Resize'],
          } as ImageResizeModule,
        },
      };
      return <RQ ref={forwardedRef} {...newProps} />;
    };
  },
  { ssr: false },
);

export default function PostForm() {
  const quillPlaceHolder =
    '[게시글 내용 작성 가이드]\n\n' +
    '1. 리플레이 영상 업로드는 필수! 판결을 받고 싶은 부분만 편집해 업로드 하기\n' +
    '- 파일 크기 제한 : 500MB\n' +
    '- 파일 형식: mp4\n' +
    "2. 게임 상황의 이해를 돕기 위해 '플레이 정보를 담은 전적 캡처 이미지'를 첨부하기\n" +
    '- 파일 크기 제한 : 2MB\n' +
    '- 파일 형식: jpg, jpeg, png\n' +
    '3. 상황 설명은 자세하게 글로 작성하기\n' +
    '- 문자 수 제한 : 1000자 이내\n';
  const quillRef = useRef<ReactQuill>(null);

  const { register } = useForm<ICreatePostFormProps>();
  const [content, setContent] = useState('');

  const handleChange = (value: string) => {
    setContent(value);
  };

  //useCallback
  const imageHandler = useCallback(() => {
    //input type= file DOM을 만든다.
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); //toolbar 이미지를 누르게 되면 이 부분이 실행된다.
    /*이미지를 선택하게 될 시*/
    input.onchange = async () => {
      /*이미지 선택에 따른 조건을 다시 한번 하게 된다.*/
      const file = input.files ? input.files[0] : null;
      /*선택을 안하면 취소버튼처럼 수행하게 된다.*/
      if (!file) return;
      /*서버에서 FormData형식으로 받기 때문에 이에 맞는 데이터형식으로 만들어준다.*/
      const formData = new FormData();
      formData.append('file', file);
      /*에디터 정보를 가져온다.*/
      // let quillObj = quillRef.current?.getEditor();
      /*에디터 커서 위치를 가져온다.*/
      // const range = quillObj?.getSelection()!;
      // try {
      /*서버에다가 정보를 보내준 다음 서버에서 보낸 url을 imgUrl로 받는다.*/
      // const res = await axios.post('api주소', formData);\
      // const imgUrl = res.data;

      // const res = await saveImageAndRequestUrlToS3(formData);

      // const res = await getImageUrl(formData);
      // console.log(res);

      //   const imgUrl = res.images[0];
      //   setContentImgUrls((prevUrls) => [...prevUrls, imgUrl]);

      //   /*에디터의 커서 위치에 이미지 요소를 넣어준다.*/
      //   quillObj?.insertEmbed(range.index, 'image', `${imgUrl}`);
      //   // Move cursor to the right of the inserted image
      //   quillObj?.setSelection(range.index + 2, 0);
      // } catch (error) {
      //   console.log(error);
      // }
    };
  }, []);

  //useMemo
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [['image']],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler],
  );

  return (
    <>
      <div className='p-content-mb mx-[30px] text-[20px] font-medium text-[#333333]'>글 작성</div>
      <div className='p-content-mb p-font-color-default flex flex-row items-center justify-center'>
        <div className='mx-[30px] font-medium text-[24px]'>제목</div>
        <input
          type='text'
          maxLength={35}
          className=' grow rounded-[30px] border-[1.5px] border-[#828282] px-[30px] py-[15px] text-[22px] font-medium outline-none'
          placeholder='최대 35글자 입력 가능합니다.'
          {...register('title')}
        />
      </div>
      <div className='p-content-mb h-[882px] overflow-hidden  rounded-[30px] border-[1.5px] border-[#828282]'>
        <ReactQuillBase
          forwardedRef={quillRef}
          modules={modules}
          className=' h-[100%] w-full whitespace-pre-wrap outline-none text-[16px] font-medium'
          value={content}
          onChange={handleChange}
          placeholder={quillPlaceHolder}
        />
      </div>
    </>
  );
}
