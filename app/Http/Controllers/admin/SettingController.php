<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\UploadsToCloudinary;

class SettingController extends Controller
{
    use UploadsToCloudinary;

    /**
     * Setting page
     * @return 
     * 
     */
    public function index (){
        try{
            $settings = Setting::first();
            return Inertia::render('admin/setting/index',[
                'settings' => $settings,
            ]);
        }catch(\Exception $e){
            return Inertia::render('admin/errors/error',[  
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function update(Request $request, $setting = null)
    {
        try {
            $data = $request->validate([
                'app_name_ar' => 'required|string',
                'app_name_en' => 'required|string',
                'copy_right_ar' => 'nullable|string',
                'copy_right_en' => 'nullable|string',
                'description_ar' => 'nullable|string',
                'description_en' => 'nullable|string',
                'app_logo' => 'nullable',
                'app_logo_black' => 'nullable',
                'app_favicon' => 'nullable',
                'app_favicon_white' => 'nullable',
                'about_ar' => 'nullable|string',
                'about_en' => 'nullable|string',
                'phone' => 'nullable|string',
                'whatsapp' => 'nullable|string',
            ]);

            $settingRecord = Setting::first();
            if (!$settingRecord) {
                $settingRecord = new Setting();
            }

            if ($request->hasFile('app_logo')) {
                $data['app_logo'] = $this->uploadToCloudinary($request->file('app_logo'), 'settings');
            } elseif (!array_key_exists('app_logo', $request->all()) || is_null($request->input('app_logo'))) {
                unset($data['app_logo']);
            }

            if ($request->hasFile('app_logo_black')) {
                $data['app_logo_black'] = $this->uploadToCloudinary($request->file('app_logo_black'), 'settings');
            } elseif (!array_key_exists('app_logo_black', $request->all()) || is_null($request->input('app_logo_black'))) {
                unset($data['app_logo_black']);
            }

            if ($request->hasFile('app_favicon')) {
                $data['app_favicon'] = $this->uploadToCloudinary($request->file('app_favicon'), 'settings');
            } elseif (!array_key_exists('app_favicon', $request->all()) || is_null($request->input('app_favicon'))) {
                unset($data['app_favicon']);
            }

            if ($request->hasFile('app_favicon_white')) {
                $data['app_favicon_white'] = $this->uploadToCloudinary($request->file('app_favicon_white'), 'settings');
            } elseif (!array_key_exists('app_favicon_white', $request->all()) || is_null($request->input('app_favicon_white'))) {
                unset($data['app_favicon_white']);
            }

            $settingRecord->fill($data);
            $settingRecord->save();

            return redirect()->back()->with('success', 'Settings updated successfully.');

        } catch (\Exception $e) {
             return Inertia::render('admin/errors/error',[  
                'error' => $e->getMessage(),
            ]);
        }
    }
}
