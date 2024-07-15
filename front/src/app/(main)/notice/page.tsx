"use client";
import style from "@/app/(main)/notice/notice.module.css"
import Link from "next/link"
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import Notice from "../_component/Notice"

export default function NoticeHome() {
    return (
      <>
      <div className={style.main}>
        <div className={style.header}>
          <span>알림</span>
        </div>
      </div>
      <Notice />
      <Notice />
      <Notice />
      </>
    )
  }