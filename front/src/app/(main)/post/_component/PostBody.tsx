"use client";

import style from "@/app/(main)/post/post.module.css";
import Link from "next/link";
import { ChangeEventHandler, useEffect, useState } from "react";

type Props = {
  params?: { sn: string, sa: string };
}

export default function PostBody({params}: Props) {
  const [shop, setShop] = useState<string>('');
  const [shopAddress, setShopAddress] = useState<string>('');
  const [hair, setHair] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [previews, setPreviews] = useState<string[]>([]);
  const [imgMax, setImgMax] = useState<string>('');

  const [selectedGender, setSelectedGender] = useState("0");
  const [selectedHairLength, setSelectedHairLength] = useState("0");
  const [selectedHairColor, setSelectedHairColor] = useState("0");

  useEffect(() => {
    if(params) {
      setShop(params.sn);
      setShopAddress(params.sa);
      console.log(`shop: ${shop}, shopAdress: ${shopAddress}`);
    }
  })

  const onChangeShop: ChangeEventHandler<HTMLInputElement> = (e) => {
    setShop(e.target.value);
  };

  const onChangeHair: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHair(e.target.value);
  };

  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const result = event.target.result as string;
            setPreviews((prevPreviews) => [...prevPreviews, result]);

            if (previews.length + 1 === 3) {
              setImgMax('사진은 최대 3장 등록 가능합니다!');
            } else {
              setImgMax(''); 
            }
          }
        };

        reader.readAsDataURL(file); 
      }
    }
  };

  const handleDeletePreview = (index: number) => {
    setPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(index, 1);

      if (newPreviews.length < 3) {
        setImgMax('');
      }

      return newPreviews;
    });
  };

  const reLoad = () => {
    setSelectedGender("0");
    setSelectedHairLength("0");
    setSelectedHairColor("0");
  };
  return (
    <>
      {/* 사진등록 */}
      <div className={style.imgContainer}>
        {previews.map((preview, index) => (
          <div key={index} className={style.imgBox}>
            <img src={preview} className={style.previewImage} alt={`Preview ${index}`} />
              
            <button className={style.closeButton} onClick={() => handleDeletePreview(index)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
            </button>
          </div>
        ))}
      </div>

      {/* 이미지 개수 제한 안내 */}
      {previews.length === 3 && (
        <span className={style.imgMax}>{imgMax}</span>
      )}

      {/* 파일 선택 */}
      {previews.length < 3 && (
        <label className={style.imgBtn} htmlFor="img">
          <div>파일 선택</div>
          <input id="img" type="file" onChange={handleImageChange} multiple style={{ display: 'none' }} />
        </label>
      )}

      {/* 아이콘 */}
      <div className={style.iconBox}>
        <div className={style.reLoading} onClick={reLoad}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
            <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
          </svg>
        </div>

        {/* 성별 선택 */}
        <div className={style.hairDiv}>
          <select className={style.gender} value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
            <option value="0" disabled>성별</option>
            <option value="1">전체</option>
            <option value="2">남자</option>
            <option value="3">여자</option>
          </select>
        </div>

        {/* 헤어 길이 선택 */}
        <div className={style.hairDiv}>
          <select className={style.hairLength} value={selectedHairLength} onChange={(e) => setSelectedHairLength(e.target.value)}>
            <option value="0" disabled>길이</option>
            <option value="1">전체</option>
            <option value="2">롱</option>
            <option value="3">미디움</option>
            <option value="4">쇼트</option>
          </select>
        </div>

        {/* 헤어 색상 선택 */}
        <div className={style.hairDiv}>
          <select className={style.hairColor} value={selectedHairColor} onChange={(e) => setSelectedHairColor(e.target.value)}>
            <option value="0" disabled>색상</option>
            <option value="1">전체</option>
            <option value="2">골드브라운</option>
            <option value="3">그레이</option>
            <option value="4">다크브라운</option>
            <option value="5">레드바이올렛</option>
            <option value="6">레드브라운</option>
            <option value="7">레드오렌지</option>
            <option value="8">레드와인</option>
            <option value="9">매트브라운</option>
            <option value="10">머쉬룸블론드</option>
            <option value="11">밀크브라운</option>
            <option value="12">발레아쥬</option>
            <option value="13">보라색</option>
            <option value="14">브라운</option>
            <option value="15">브릿지</option>
            <option value="16">블랙</option>
            <option value="17">블론드</option>
            <option value="18">블루블랙</option>
            <option value="19">새치염색</option>
            <option value="20">솜브레</option>
            <option value="21">애쉬그레이</option>
            <option value="22">애쉬바이올렛</option>
            <option value="23">애쉬베이지</option>
            <option value="24">애쉬브라운</option>
            <option value="25">애쉬블론드</option>
            <option value="26">애쉬블루</option>
            <option value="27">애쉬카키</option>
            <option value="28">애쉬카키브라운</option>
            <option value="29">애쉬퍼플</option>
            <option value="30">애쉬핑크</option>
            <option value="31">오렌지브라운</option>
            <option value="32">옴브레</option>
            <option value="33">초코브라운</option>
            <option value="34">카키</option>
            <option value="35">카키브라운</option>
            <option value="36">탈색</option>
            <option value="37">투톤</option>
            <option value="38">핑크브라운</option>
          </select>
        </div>
      </div>

      {/* 미용실 입력 */}
      <div className={style.choiceShop}>
        <input id="shop" disabled className={style.shopInput} value={shop} onChange={onChangeShop} type="text" placeholder={shop || '미용실 입력...'} />
        <Link href="post/findShop" className={style.shopBtn}>미용실 찾기</Link>
      </div>

      {/* 헤어이름 입력 */}
      <div className={style.choiceHair}>
        <input id="hair" className={style.hairInput} value={hair} onChange={onChangeHair} type="text" placeholder="헤어이름 입력..." />
      </div>

      {/* 게시글 내용 작성 */}
      <div className={style.postContent}>
        <textarea id="content" className={style.content} value={content} onChange={onChangeContent} placeholder="게시글 작성..." />
      </div>

      {/* 게시글 등록 버튼 */}
      <Link href="/login" className={style.postButton}>게시글 등록</Link>
    </>
  )
}