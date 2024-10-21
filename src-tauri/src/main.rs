#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use serde::{Deserialize, Serialize};
use std::fs::{self, File};
use std::io::{Read, Write};
use std::path::PathBuf;
use tauri::command;

// 定义计划的结构体
#[derive(Serialize, Deserialize, Clone, Debug)]
struct Plan {
  id: usize,
  description: String,
  date: String,
}

fn get_plans_file_path() -> Result<PathBuf, String> {
  let mut dir = dirs::data_dir().ok_or_else(|| "Could not find data directory.".to_string())?;
  dir.push("MyApp"); // 应用的文件夹名称
  dir.push("plans.json"); // 文件名
  Ok(dir)
}


// 保存计划到本地文件
#[command]
fn save_plans(plans: Vec<Plan>) -> Result<(), String> {
  let file_path = get_plans_file_path()?;

  // 打印保存文件的路径
  println!("Saving plans to: {:?},{:?}", file_path, plans);

  // 确保目录存在
  if let Some(parent) = file_path.parent() {
    fs::create_dir_all(parent).map_err(|e| e.to_string())?;
  }

  // 序列化数据并写入文件
  let serialized = serde_json::to_string(&plans).map_err(|e| e.to_string())?;
  let mut file = File::create(file_path).map_err(|e| e.to_string())?;
  file.write_all(serialized.as_bytes()).map_err(|e| e.to_string())?;
  
  println!("Plans saved successfully.");
  Ok(())
}


// 从本地文件加载计划
#[command]
fn load_plans() -> Result<Vec<Plan>, String> {
  let file_path = get_plans_file_path()?;

  // 如果文件不存在，返回空列表
  if !file_path.exists() {
    return Ok(vec![]);
  }

  // 读取文件内容
  let mut file = File::open(file_path).map_err(|e| e.to_string())?;
  let mut content = String::new();
  file.read_to_string(&mut content).map_err(|e| e.to_string())?;

  // 反序列化数据
  let plans: Vec<Plan> = serde_json::from_str(&content).map_err(|e| e.to_string())?;
  print!("loading {:?}", plans);
  Ok(plans)
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![save_plans, load_plans])
    .run(tauri::generate_context!())
    .expect("error while running Tauri application");
}
